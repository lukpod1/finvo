import * as sst from "@serverless-stack/resources";
import { HttpUserPoolAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers-alpha";

export default class TransactionStack extends sst.Stack {
  // Public reference to the API
  transactionsApi;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { transactionsTable, accountsTable, auth } = props;

    // Create the API
    this.transactionsApi = new sst.Api(this, "TransactionsApi", {
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
        "POST   /transactions": "backend/services/transactions/handlers/create.handler",
        "GET    /transactions/{id}/{accountId}": "backend/services/transactions/handlers/retrieve.handler",
        "DELETE   /transactions/{id}/{accountId}": "backend/services/transactions/handlers/delete.handler",
        "GET    /transactions/{accountId}": "backend/services/transactions/handlers/find.handler",
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