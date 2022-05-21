import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { getUserById } from './retrieve';
import { validateField } from '../../../libs/validateField';

class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

async function updateUser(event) {

    const { id } = event.pathParameters;

    const { username, email, password } = event.body;

    const eventRequest = {
        pathParameters: { id }
    };
    const params = {
        TableName: process.env.USERS_TABLE,
        Key: { id },
        UpdateExpression: "SET username = :username, email = :email, password = :password",
        ExpressionAttributeValues: {
            ":username": "",
            ":email": "",
            ":password": ""
        },
        ReturnValues: 'ALL_NEW'
    };

    console.log(event.requestContext.authorizer.role);
    const { body } = await getUserById(eventRequest);

    const data = JSON.parse(body);

    const user = new User(data.id, data.username, data.email, data.password);

    let fieldsForValid = {
        fields: [
            { field: username, column: "username"},
            { field: email, column: "email"},
            { field: password, column: "password"},
        ],
        params,
        user
    };

    const userUpdate = await validateFieldUpdateUser(fieldsForValid);
    
    try {
        const response = await dynamoDb.update(userUpdate);
        return Responses.OK(response.Attributes);
    } catch (error) {
        return Responses.InternalServerError(error);
    }

}

async function validateFieldUpdateUser(data) {

    for (const element of data.fields) {
        if (!element.field) {
            data.params.ExpressionAttributeValues[`:${element.column}`] = data.user[`${element.column}`];
        } else {
            const fieldValid = await validateField({
                table: process.env.USERS_TABLE,
                column: element.column,
                field: element.field
            });
    
            if (fieldValid) {
                throw Responses.Conflict(`The "${element.field}" already exists`);
            } else {
                data.params.ExpressionAttributeValues[`:${element.column}`] = element.field;
            }
        }
    }

    return data.params;
}

export const handler = middleware(updateUser);