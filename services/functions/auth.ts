import { AuthHandler, GoogleAdapter, Session } from "@serverless-stack/node/auth";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { Table } from "@serverless-stack/node/table";
import { ViteStaticSite } from "@serverless-stack/node/site";

const GOOGLE_CLIENT_ID = "269061598066-fgmkrr14021hgbje3f9tsafhjkjob094.apps.googleusercontent.com";

declare module "@serverless-stack/node/auth" {
    export interface SessionType {
        user: {
            userID: string
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
                const ddb = new DynamoDBClient({});
                await ddb.send(new PutItemCommand({
                    TableName: Table.users.tableName,
                    Item: marshall({
                        userId: claims.sub,
                        email: claims.email,
                        picture: claims.picture,
                        name: claims.given_name
                    })
                }));
                
                return Session.parameter({
                    redirect: process.env.IS_LOCAL ? "http://127.0.0.1:5173" : ViteStaticSite.Site.url,
                    type: "user",
                    properties: {
                        userID: claims.sub,
                    },
                });
            }
        })
    }
})