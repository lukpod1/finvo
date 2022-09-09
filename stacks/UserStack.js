import * as sst from "@serverless-stack/resources";

export default class UserStack extends sst.Stack {
    // Public reference to the API
    usersApi;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { usersTable, auth } = props;

        // Create the API
        this.usersApi = new sst.Api(this, "UsersApi", {
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
                authorizer: "jwt",
                function: {
                    environment: {
                        USERS_TABLE: usersTable.tableName,
                    }
                }
            },
            routes: {
                "PUT    /users/{id}": "backend/services/users/handlers/update.handler",
                "GET    /users": "backend/services/users/handlers/retrieve.handler",
            },
            cors: true
        });

        // Allow the API to access the table
        this.usersApi.attachPermissions([usersTable]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.usersApi.url,
        });
    }
}