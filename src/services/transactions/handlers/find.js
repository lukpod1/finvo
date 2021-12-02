import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import middleware from '../../../libs/middleware';

async function findTransactions(event) {

    const { accountId } = event.pathParameters;
    try {

        const params = {
            TableName: process.env.TRANSACTIONS_TABLE,
            FilterExpression: "#accountId = :accountId",
            ExpressionAttributeNames: {
                "#accountId": "accountId"
            },
            ExpressionAttributeValues: {
                ":accountId": accountId
            }
        };
        const result = await dynamoDb.scan(params);

        return Responses.OK(result.Items);
    } catch (error) {
        return Responses.InternalServerError(error);
    }

}

export const handler = middleware(findTransactions);
