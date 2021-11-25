import dynamoDb from '../../../libs/dynamodb';
import middleware from '../../../libs/middleware';
import { Responses } from '../../../libs/response';
import { verify } from "../../../libs/encryption";
import jwt from "jsonwebtoken";

async function signIn(event) {

    try {
        const { email, password } = event.body;

        const user = await dynamoDb.scan({
            TableName: process.env.USERS_TABLE,
            FilterExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        });

        if (user.Items.length == 1) {
            if (await verify(password, user.Items[0].password)) {
                const token = jwt.sign({
                    id: user.Items[0].id,
                    email: user.Items[0].email,
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );

                return Responses.OK({
                    message: "successfully authenticated",
                    user: user.Items[0].id,
                    token: token
                });
            }
            return Responses.Unauthorized("Incorrect password");

        }

        return Responses.Unauthorized("Incorrect email");
    } catch (error) {
        return Responses.InternalServerError(`Authentication Failure`);
    }
}

export const handler = middleware(signIn);