import * as sst from "@serverless-stack/resources";
import { VerificationEmailStyle, UserPoolOperation } from "aws-cdk-lib/aws-cognito";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";

export default class AuthStack extends sst.Stack {

    // Public reference to the API
    authorizer;

    constructor(scope, id, props) {
        super(scope, id, props);

        const confirmUserSignUp = new sst.Function(this, "ConfirmUserSignUp", {
            handler: "src/services/authentication/confirm-user-signup.handler",
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
                    authFlows: { userPassword: true },
                },
                triggers: {
                    postConfirmation: confirmUserSignUp
                }
            }
        });

        // this.authorizer.attachPermissionsForAuthUsers([])

        this.addOutputs({
            UserPoolId: this.authorizer.cognitoUserPool.userPoolId,
            UserPoolClientId: this.authorizer.cognitoUserPoolClient.userPoolClientId,
            IdentityPoolId: this.authorizer.cognitoCfnIdentityPool.ref,
            ConfirmUserSignupArn: confirmUserSignUp.functionArn,
            ConfirmUserSignupName: confirmUserSignUp.functionName,
        });

    }
}