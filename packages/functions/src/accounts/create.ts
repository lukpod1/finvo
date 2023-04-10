import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
    console.log("EVENT:", event);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello World!",
        }),
    };
});