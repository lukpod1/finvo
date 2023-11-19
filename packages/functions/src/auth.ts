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

function getDefaultRedirectURL(): string {
    if (isValidURL(process.env.SITE_URL)) {
        return process.env.SITE_URL;
    }

    if (isValidURL(process.env.FRONTEND_URL)) {
        return process.env.FRONTEND_URL;
    }

    return getDefaultLocalhostURL();
}

function getDefaultLocalhostURL() {
    return "http://localhost:" + (process.env.SITE_URL ? "3000" : "5173") + "/login";
}

// Função para verificar se uma string é uma URL válida
function isValidURL(str: any) {
    try {
        new URL(str);
        return true;
    } catch (error) {
        return false;
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

                let redirectURL = getDefaultRedirectURL();

                console.log("ENV: ", redirectURL);

                return Session.parameter({
                    redirect: redirectURL,
                    type: "user",
                    properties: {
                        userID: user.sub,
                    },
                })
            }
        }),
    }
});
