import { ApiHandler, useCookies } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { fromID } from "@finvo/core/user";

export const handler = ApiHandler(async () => {
	const session = useSession();
	const cookies = useCookies();

	// Check user is authenticated
	if (session.type !== "user") {
		throw new Error("Not authenticated");
	}
	
	const data = {
		user: {},
		token: ""
	};

	const user = await fromID(session.properties.userID);
	
	data.user = user;
	data.token = cookies["auth-token"];
	
	console.log("data:", data);
	return {
		statusCode: 200,
		body: JSON.stringify(data),
	};
});