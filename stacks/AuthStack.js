import * as sst from "@serverless-stack/resources";
import { VerificationEmailStyle } from "aws-cdk-lib/aws-cognito";

export default class AuthStack extends sst.Stack {

    // Public reference to the API
    authorizer;

    constructor(scope, id, props) {
        super(scope, id, props);

        const postConfirmation = new sst.Function(this, "ConfirmUserSignUp", {
            handler: "src/services/authentication/confirm-user-signup.handler"
        })

        this.authorizer = new sst.Auth(this, "Auth", {
            cognito: {
                userPool: {
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
                    authFlows: {userPassword: true},
                },
                triggers: {
                    postConfirmation
                }
            }
        });

        this.addOutputs({
            UserPoolId: this.authorizer.cognitoUserPool.userPoolId,
            UserPoolClientId: this.authorizer.cognitoUserPoolClient.userPoolClientId,
            IdentityPool: this.authorizer.cognitoIdentityPoolId,
            ConfirmUserSignupArn: postConfirmation.functionArn,
            ConfirmUserSignupName: postConfirmation.functionName,
        });

    }
}