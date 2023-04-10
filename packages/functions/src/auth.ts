import { AuthHandler, GoogleAdapter, Session, SessionTypes } from "sst/node/auth";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table"
import { marshall } from "@aws-sdk/util-dynamodb"
import { Config } from "sst/node/config";
import { randomUUID } from "crypto";

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
                const newUser = await ddb.send(new PutItemCommand({
                    TableName: Table.users.tableName,
                    Item: marshall({
                        id: user.sub,
                        email: user.email,
                        picture: user.picture,
                        name: user.given_name,
                    })
                }))

                const account = await ddb.send(new PutItemCommand({
                    TableName: Table.accounts.tableName,
                    Item: marshall({
                        id: randomUUID(),
                        userId: user.sub,
                        name: "Default Account",
                        balance: 0,
                    })
                }))

                console.log("NEW USER:", newUser);
                console.log("NEW ACCOUNT:", account);

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
