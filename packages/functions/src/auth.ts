import { AuthHandler, GoogleAdapter, Session, SessionTypes } from "sst/node/auth";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table"
import { marshall } from "@aws-sdk/util-dynamodb"
import { Config } from "sst/node/config";

declare module "sst/node/auth" {
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
            clientID: Config.GOOGLE_CLIENT_ID,
            onSuccess: async (tokenset) => {
                console.log("TOKENSET:", tokenset)
                const user = tokenset.claims();

                const ddb = new DynamoDBClient({});
                await ddb.send(new PutItemCommand({
                    TableName: Table.users.tableName,
                    Item: marshall({
                        id: user.sub,
                        email: user.email,
                        picture: user.picture,
                        name: user.given_name,
                    })
                }))

                console.log("ENV: ", process.env.SITE_URL)
                return Session.parameter({
                    redirect: `${process.env.SITE_URL}/login`|| "http://localhost:3000/login",
                    type: "user",
                    properties: {
                        userID: user.sub,
                    },
                })
            }
        }),
    }
});
