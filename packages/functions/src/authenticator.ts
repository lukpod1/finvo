import { AuthHandler, GoogleAdapter } from "sst/node/auth";

export const handler = AuthHandler({
    providers: {
        global: GoogleAdapter({
            mode: "oidc",
            clientID: "",
            onSuccess: async (tokenset) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({tokenset}), 
                }
            }
        }),
    }
});
