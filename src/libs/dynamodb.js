import { DynamoDB } from "aws-sdk";

let options = {};

if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:4566'
    };
}

const dynamodb = new DynamoDB.DocumentClient(options);

export default {
    put: (params) => dynamodb.put(params).promise(),
    get: (params) => dynamodb.get(params).promise(),
    query: (params) => dynamodb.query(params).promise(),
    scan: (params) => dynamodb.scan(params).promise(),
    update: (params) => dynamodb.update(params).promise(),
    delete: (params) => dynamodb.delete(params).promise(),
};
