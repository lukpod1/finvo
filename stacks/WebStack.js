import * as sst from "@serverless-stack/resources";

export default class WebStack extends sst.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const { auth, usersApi, accountsApi, transactionsApi } = props;

    const cognitoRegion = 'us-east-1'

    const site = new sst.StaticSite(this, "Site", {
      path: "frontend",
      environment: {
        VITE_COGNITO_REGION: cognitoRegion,
        VITE_USER_POOL_ID: auth.userPoolId,
        VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
        VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
        VITE_USERS_API_URL: usersApi.url,
        VITE_ACCOUNTS_API_URL: accountsApi.url,
        VITE_TRANSACTIONS_API_URL: transactionsApi.url
      },
    });

    // Show the URLs in the output
    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}
