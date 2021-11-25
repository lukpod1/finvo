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

    const { body } = await getUserById(eventRequest);

    const data = JSON.parse(body);
    
    const user = new User(data.id, data.username, data.email, data.password);

    if (!username) {
        params.ExpressionAttributeValues[':username'] = user.username
    } else {
        const usernameIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "username",
            field: username
        });

        if (usernameIsValid) {
            return Responses.Conflict(`The "${username}" already exists`);
        }else {
            params.ExpressionAttributeValues[':username'] = username;
        }
    }

    if (!email) {
        params.ExpressionAttributeValues[':email'] = user.email;
    } else {
        const emailIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "email",
            field: email
        });

        if (emailIsValid) {
            return Responses.Conflict(`The "${email}" already exists`);
        } else {
            params.ExpressionAttributeValues[':email'] = email;
        }
    }

    if (!password) {
        console.log("password não está preenchido")
        params.ExpressionAttributeValues[':password'] = user.password;
    } else {
        const passwordIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "password",
            field: password
        });

        if (passwordIsValid) {
            return Responses.Conflict(`The "${password}" already exists`);
        } else {
            params.ExpressionAttributeValues[':password'] = password;
        }
    }

    try {
        const response = await dynamoDb.update(params);
        return Responses.OK(response.Attributes);
    } catch (error) {
        return Responses.InternalServerError(error);
    }

}

export const handler = middleware(updateUser);