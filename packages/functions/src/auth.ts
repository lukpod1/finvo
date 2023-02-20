import { AuthHandler, GoogleAdapter, Session } from "sst/node/auth";
import { DynamoDBClient, PutItemCommand, TableAlreadyExistsException } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table"
import { marshall } from "@aws-sdk/util-dynamodb"
const GOOGLE_CLIENT_ID = "823613221886-o4at5m3kucnh8lf0i3ml4dtohkbnpfq0.apps.googleusercontent.com";

declare module "@serverless-stack/node/auth" {
    export interface SessionTypes {
        user: {
            userID: string;
        }
    }
}

export const handler = AuthHandler({
    providers: {
        google: GoogleAdapter({
            mode: "oidc",
            clientID: GOOGLE_CLIENT_ID,
            onSuccess: async (tokenset) => {
                const claims = tokenset.claims();

                const ddb = new DynamoDBClient({})
                await ddb.send(new PutItemCommand({
                    TableName: Table.users.tableName,
                    Item: marshall({
                        id: claims.sub,
                        email: claims.email,
                        picture: claims.picture,
                        name: claims.given_name,
                    })
                }))
                
                return Session.parameter({
                    redirect: "http://localhost:3000",
                    type: "user",
                    properties: {
                        userID: claims.sub,
                    }
                })
            }
        }),
    }
});
