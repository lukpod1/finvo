import chance from "chance";
import { Responses } from '../../libs/response';

export function handler(event) {
    const name = event.request.userAttributes;
    const suffix = chance.Chance().string({
        length: 8,
        casing: 'upper',
        alpha: true,
        numeric: true
    });

    console.log({
        message: "Teste Confirm User SignUp",
        name
    });
    return Responses.OK({
        message: "Teste Confirm User SignUp",
        name
    });
}