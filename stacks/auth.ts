import { Auth as STTAuth, StackContext, use } from "sst/constructs";
import { Web } from "./web";
import { API } from "./api";
import { Secrets } from "./secrets";

export function Auth({ stack, app }: StackContext) {

	const { google, neonDB } = use(Secrets);
	const api = use(API);
	const { site } = use(Web);

	const auth = new STTAuth(stack, "auth", {
		authenticator: {
			handler: "packages/functions/src/auth.handler",
			bind: [site, google.GOOGLE_CLIENT_ID, neonDB.NEON_DB_URL],
			environment: {
				SITE_URL:
					app.mode === "dev"
						? "http://localhost:5173"
						: `${site.url}`,
			},
		},
	});

	auth.attach(stack, {
		api,
		prefix: "/auth"
	})
}
