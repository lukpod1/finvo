import * as sst from "@serverless-stack/resources";

export default class TransactionStack extends sst.Stack {
    // Public reference to the API
    transactionsApi;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { transactionsTable, accountsTable } = props;

        // Create the API
        this.transactionsApi = new sst.Api(this, "TransactionsApi", {
            // defaultAuthorizationType: "AWS_IAM",
            defaultFunctionProps: {
                environment: {
                    TRANSACTIONS_TABLE: transactionsTable.tableName,
                    ACCOUNTS_TABLE: accountsTable.tableName
                }
            },
            routes: {
                "POST   /transactions": "src/services/transactions/handlers/create.handler",
                "GET    /transactions/{id}/{accountId}": "src/services/transactions/handlers/retrieve.handler",
                "DELETE   /transactions/{id}/{accountId}": "src/services/transactions/handlers/delete.handler",
                "GET    /transactions/{accountId}": "src/services/transactions/handlers/find.handler",
            },
            cors: true
        });

        // Allow the API to access the table
        this.transactionsApi.attachPermissions([transactionsTable, accountsTable]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.transactionsApi.url,
        });
    }
}
