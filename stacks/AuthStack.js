  import * as sst from "@serverless-stack/resources";
import { VerificationEmailStyle } from "aws-cdk-lib/aws-cognito";

export default class AuthStack extends sst.Stack {

    // Public reference to the API
    authorizer;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { usersTable } = props;

        const confirmUserSignUp = new sst.Function(this, "ConfirmUserSignUp", {
            handler: "backend/services/authentication/confirm-user-signup.handler",
            timeout: 30,
            environment: {
                USERS_TABLE: usersTable.tableName,
            }
        })

        // Create a Cognito User Pool and Identity Pool
        this.authorizer = new sst.Cognito(this, "Auth", {
            cdk: {
                userPool: {
                    standardAttributes: {
                        fullname: { required: true, mutable: false }
                    },
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
                }
            },
            triggers: {
                postConfirmation: confirmUserSignUp
            }
        });

        confirmUserSignUp.attachPermissions(["dynamodb", "cognito", usersTable])

        this.addOutputs({
            UserPoolId: this.authorizer.userPoolId,
            UserPoolClientId: this.authorizer.userPoolClientId,
            IdentityPoolId: this.authorizer.cognitoIdentityPoolId,
            ConfirmUserSignupArn: confirmUserSignUp.functionArn,
            ConfirmUserSignupName: confirmUserSignUp.functionName,
        });

    }
}
