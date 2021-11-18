import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const app = this.node.root;

        const userTable = new dynamodb.Table(this, "Users", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
        });

        const accountTable = new dynamodb.Table(this, "Accounts", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            sortKey: { name: "userId", type: dynamodb.AttributeType.STRING }
        });

        const transactionTable = new dynamodb.Table(this, "Transactions", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
            partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
            sortKey: { name: "accountId", type: dynamodb.AttributeType.STRING }
        });


        // Output values
        new CfnOutput(this, "UsersName", {
            value: userTable.tableName,
            exportName: app.logicalPrefixedName("RsrcUserName"),
        });
        new CfnOutput(this, "UsersArn", {
            value: userTable.tableArn,
            exportName: app.logicalPrefixedName("RsrcUserArn"),
        });

        new CfnOutput(this, "AccountsName", {
            value: accountTable.tableName,
            exportName: app.logicalPrefixedName("RsrcAccountName"),
        });
        new CfnOutput(this, "AccountsArn", {
            value: accountTable.tableArn,
            exportName: app.logicalPrefixedName("RsrcAccountArn"),
        });

        new CfnOutput(this, "TransactionsName", {
            value: transactionTable.tableName,
            exportName: app.logicalPrefixedName("RsrcTransactionName"),
        });
        new CfnOutput(this, "TransactionsArn", {
            value: transactionTable.tableArn,
            exportName: app.logicalPrefixedName("RsrcTransactionArn"),
        });


    }
}
