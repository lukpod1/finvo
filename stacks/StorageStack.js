import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
    // Public reference to the table
    usersTable;
    accountsTable;
    transactionsTable;
    bucket;

    constructor(scope, id, props) {
        super(scope, id, props);

        // Create the DynamoDB table
        this.usersTable = new sst.Table(this, "Users", {
            fields: {
                id: sst.TableFieldType.STRING,
            },
            primaryIndex: { partitionKey: "id"},
        });

        this.accountsTable = new sst.Table(this, "Accounts", {
            fields: {
                id: sst.TableFieldType.STRING,
                userId: sst.TableFieldType.STRING
            },
            primaryIndex: { partitionKey: "id", sortKey: "userId" },
        });

        this.transactionsTable = new sst.Table(this, "Transactions", {
            fields: {
                id: sst.TableFieldType.STRING,
                accountId: sst.TableFieldType.STRING,
            },
            primaryIndex: { partitionKey: "id", sortKey: "accountId" },
        });

        // Create an S3 bucket
        this.bucket = new sst.Bucket(this, "Uploads", {
            s3Bucket: {
                // Allow client side access to the bucket from a different domain
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ["*"],
                        allowedHeaders: ["*"],
                        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                    },
                ],
            }
        });
    }
}