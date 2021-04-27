import dynamoDb from './dynamodb';

export const validateField = async (params) => {
    const { table, column, field } = params;

    const response = await dynamoDb.scan({
        TableName: table,
        FilterExpression: "#column = :field",
        ExpressionAttributeNames: {
            "#column": column
        },
        ExpressionAttributeValues: {
            ":field": field
        }
    });

    return response.Items.length > 0;
};