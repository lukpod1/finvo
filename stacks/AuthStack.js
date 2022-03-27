  import * as sst from "@serverless-stack/resources";
import { VerificationEmailStyle } from "aws-cdk-lib/aws-cognito";

export default class AuthStack extends sst.Stack {

    // Public reference to the API
    authorizer;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { usersTable } = props;

        const confirmUserSignUp = new sst.Function(this, "ConfirmUserSignUp", {
            handler: "services/authentication/confirm-user-signup.handler",
            srcPath: "src/",
            environment: {
                USERS_TABLE: usersTable.tableName,
            }
        })

        // Create a Cognito User Pool and Identity Pool
        this.authorizer = new sst.Auth(this, "Auth", {
            cognito: {
                userPool: {
                    // Users can login with their email and password
                    signInAliases: {
                        email: true,
                    },
                    selfSignUpEnabled: true,
                    signInCaseSensitive: false,
                    userVerification: {
                        emailSubject: "Verify your email!",
                        emailBody: "Hello, Thanks for signing up! {####}",
                        emailStyle: VerificationEmailStyle.CODE
                    },
                    autoVerify: {
                        email: true
                    },
                    passwordPolicy: {
                        minLength: 8,
                        requireLowercase: false,
                        requireUppercase: false,
                        requireDigits: false,
                        requireSymbols: false
                    }
                },
                userPoolClient: {
                    authFlows: { userPassword: true, userSrp: true },
                },
                triggers: {
                    postConfirmation: confirmUserSignUp
                }
            }
        });

        confirmUserSignUp.attachPermissions(["dynamodb", "cognito", usersTable])

        this.addOutputs({
            UserPoolId: this.authorizer.cognitoUserPool.userPoolId,
            UserPoolClientId: this.authorizer.cognitoUserPoolClient.userPoolClientId,
            IdentityPoolId: this.authorizer.cognitoCfnIdentityPool.ref,
            ConfirmUserSignupArn: confirmUserSignUp.functionArn,
            ConfirmUserSignupName: confirmUserSignUp.functionName,
        });

    }
}
