import { CfnOutput } from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        const app = this.node.root;

        const userTable = new dynamodb.Table(this, "Users", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand billing mode
            partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
        });

        // Output values
        new CfnOutput(this, "UsersName", {
            value: userTable.tableName,
            exportName: app.logicalPrefixedName("ResourceUserName"),
        });
        new CfnOutput(this, "UsersArn", {
            value: userTable.tableArn,
            exportName: app.logicalPrefixedName("ResourceUserArn"),
        });
    }
}
