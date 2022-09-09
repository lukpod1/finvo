import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import middleware from '../../../libs/middleware';

export async function getUser(event) {

    const { email } = event.queryStringParameters;

    try {

        const result = await dynamoDb.scan({
            TableName: process.env.USERS_TABLE,
            FilterExpression: "#email = :email",
            ExpressionAttributeNames: {
                "#email": "email"
            },
            ExpressionAttributeValues: {
                ":email": email
            },
            ReturnConsumedCapacity: "TOTAL"
        });

        return Responses.OK(result.Items[0]);
    } catch (error) {
        return Responses.InternalServerError(error);
    }

}

export const handler = middleware(getUser);