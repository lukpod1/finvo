import chance from "chance";
import dynamodb from "../../libs/dynamodb";

module.exports.handler = async (event) => {
    const email = event.request.userAttributes['email'];
    const suffix = chance.Chance().string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true
    });

    const screenName = `${email.replace(/[^a-zA-Z0-9]/g, '')}${suffix}`;

    if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
        const user = {
            id: event.userName,
            email,
            screenName,
            createdAt: new Date().toJSON(),
        }

        await dynamodb.put({
            TableName: process.env.USERS_TABLE,
            Item: user,
            ConditionExpression: 'attribute_not_exists(id)'
        });

        return event;
    } 
}
