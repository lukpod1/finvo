
import * as sst from "@serverless-stack/resources";


export default class FrontEndStack extends sst.Stack {

    constructor(scope, id, props) {
        super(scope, id, props);

        const { auth, usersApi, accountsApi, transactionsApi } = props;

        const site = new sst.ViteStaticSite(this, "ViteSite", {
            path: "frontend",
            environment: {
                USER_POOL_ID: auth.cognitoUserPool.userPoolId,
                USER_POOL_CLIENT_ID: auth.cognitoUserPoolClient.userPoolClientId,
                IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
                USERS_API_URL: usersApi.url,
                ACCOUNTS_API_URL: accountsApi.url,
                TRANSACTIONS_API_URL: transactionsApi.url
            },
            buildOutput: "dist",
            buildCommand: "yarn && yarn build",
        })

        // Show the URLs in the output
        this.addOutputs({
            SiteUrl: site.url,
        });
    }
}