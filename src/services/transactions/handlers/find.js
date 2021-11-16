import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import middleware from '../../../libs/middleware';

async function findTransactions(event) {

    const { accountId } = event.pathParameters;
    try {

        console.log(accountId);

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
        console.log(params);
        const result = await dynamoDb.scan(params);
        console.log(result.Items);

        Responses.OK(result.Items);
    } catch (error) {
        Responses.InternalServerError(error);
    }

}

export const handler = middleware(findTransactions);
