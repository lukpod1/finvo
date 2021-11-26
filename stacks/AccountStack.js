import * as sst from "@serverless-stack/resources";

export default class AccountStack extends sst.Stack {
    // Public reference to the API
    accountsApi;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { accountsTable } = props;

        // Create the API
        this.accountsApi = new sst.Api(this, "AccountsApi", {
            // defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                environment: {
                    ACCOUNTS_TABLE: accountsTable.tableName,
                    
                }
            },
            routes: {
                "POST   /accounts": "src/services/accounts/handlers/create.handler",
                "DELETE   /accounts/{id}/{userId}": "src/services/accounts/handlers/remove.handler",
                "PUT    /accounts/{id}/{userId}": "src/services/accounts/handlers/update.handler",
                "POST    /accounts/{id}": "src/services/accounts/handlers/find.handler",
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