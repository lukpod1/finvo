import chance from "chance";
import { Responses } from '../../libs/response';

export function handler(event) {
    const name = event.request.userAttributes['name'];
    const suffix = chance.Chance().string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true
    });

    const screenName = `${name.replace(/[^a-zA-Z0-9]/g, '')}${suffix}`;

    console.log({
        message: "Teste Confirm User SignUp",
        name,
        screenName
    });
    return Responses.OK({
        message: "Teste Confirm User SignUp",
        name,
        screenName
    });
}