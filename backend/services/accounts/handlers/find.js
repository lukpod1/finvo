import { Responses } from '../../../libs/response';
import middleware from '../../../libs/middleware';
import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

export async function find(event) {
    const { userId } = event.queryStringParameters;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.ACCOUNTS_TABLE,
            FilterExpression: "#userId = :userId",
            ExpressionAttributeNames: {
                "#userId": "userId"
            },
            ExpressionAttributeValues: {
                ":userId": userId
            },
            ReturnConsumedCapacity: "TOTAL"
        });
        return Responses.OK({items: result.Items, count: result.Count});
    } catch(error) {
        return Responses.InternalServerError(error);
    }

}

export const handler = middleware(find);
