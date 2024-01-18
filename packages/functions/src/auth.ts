import { AuthHandler, GoogleAdapter, Session, SessionTypes } from "sst/node/auth";
import { Config } from "sst/node/config";
import { create } from "@finvo/core/user";

declare module "sst/node/auth" {
	export interface SessionTypes {
		user: {
			userID: string;
		}
	}
}

const saveUser = async (user: any): Promise<void> => {
	console.log("chegou no saveUser...")
	const newUser = await create({
		id: user.sub,
		email: user.email,
		picture: user.picture,
		name: user.given_name,
	});
	console.log(`User id: ${newUser}`);
}

export const handler = AuthHandler({
	providers: {
		google: GoogleAdapter({
			mode: "oidc",
			clientID: Config.GOOGLE_CLIENT_ID,
			onSuccess: async (tokenset) => {

				console.log("TOKENSET:", tokenset)
				const user = tokenset.claims();

				await saveUser(user);

				console.log("ENV: ", process.env.SITE_URL)
				return Session.parameter({
					redirect: `${process.env.SITE_URL}/login` || "http://localhost:5173/login",
					type: "user",
					properties: {
						userID: user.sub,
					},
				})
			}
		}),
	}
});
