import * as sst from "@serverless-stack/resources";

export default class WebStack extends sst.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const { auth, usersApi, accountsApi, transactionsApi } = props;

    const site = new sst.ViteStaticSite(this, "Site", {
      path: "frontend",
      environment: {
        USER_POOL_ID: auth.userPoolId,
        USER_POOL_CLIENT_ID: auth.userPoolClientId,
        IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
        USERS_API_URL: usersApi.url,
        ACCOUNTS_API_URL: accountsApi.url,
        TRANSACTIONS_API_URL: transactionsApi.url
      },
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}