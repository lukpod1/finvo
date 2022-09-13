import chance from "chance";
import dynamodb from "../../libs/dynamodb";

module.exports.handler = async (event) => {
    console.log('EVENT', event)
    const email = event.request.userAttributes['email'];
    const fullName = event.request.userAttributes['name'];

    if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
        const user = {
            id: event.userName,
            email,
            fullName,
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
