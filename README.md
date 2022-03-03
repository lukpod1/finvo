### Create a Test User

We’ll use AWS CLI to sign up a user with their email and password.

```shell
aws cognito-idp sign-up \
  --region COGNITO_REGION \
  --client-id USER_POOL_CLIENT_ID \
  --username admin@example.com \
  --password Passw0rd!
```

#### Return
```json
{
    "UserConfirmed": false,
    "CodeDeliveryDetails": {
        "Destination": "l***@g***",
        "DeliveryMedium": "EMAIL",
        "AttributeName": "email"
    },
    "UserSub": "33b001e1-d0d3-4092-99eb-32cf8da00137"
}
```

Verified email

```shell
aws cognito-idp admin-confirm-sign-up \
  --region us-east-1 \
  --user-pool-id us-east-1_4VDEwiDWX \
  --username lukasalvespod1@gmail.com
```

aws cognito-idp admin-update-user-attributes --user-pool-id us-west-2_aaaaaaaaa --username diego@example.com  --user-attributes Name="custom:CustomAttr1",Value="Purple"