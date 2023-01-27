import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import mysql from "mysql2";


export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, World! Your request was received at ${event.requestContext.time}.`,
  };
};
