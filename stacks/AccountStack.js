import * as sst from "@serverless-stack/resources";
import { HttpUserPoolAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers-alpha";

export default class AccountStack extends sst.Stack {
    // Public reference to the API
    accountsApi;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { accountsTable, auth } = props;

        // Create the API
        this.accountsApi = new sst.Api(this, "AccountsApi", {
            authorizers: {
                jwt: {
                    type: "user_pool",
                    userPool: {
                        id: auth.userPoolId,
                        clientIds: [auth.userPoolClientId]
                    }
                }
            },
            defaults: {
                authorizer: "jwt"
            },
            routes: {
                "POST   /accounts": "backend/services/accounts/handlers/create.handler",
                "DELETE   /accounts/{id}/{userId}": "backend/services/accounts/handlers/remove.handler",
                "PUT    /accounts/{id}/{userId}": "backend/services/accounts/handlers/update.handler",
                "POST   /accounts/{id}/{userId}": "backend/services/accounts/handlers/find.handler",
            },
            cors: true
        });

        // Allow the API to access the table
        this.accountsApi.attachPermissions([accountsTable]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.accountsApi.url,
        });
    }
}
