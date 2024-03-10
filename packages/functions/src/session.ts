import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { fromID } from "@finvo/core/user";

export const handler = ApiHandler(async () => {
	const session = useSession();

	// Check user is authenticated
	if (session.type !== "user") {
		throw new Error("Not authenticated");
	}

	const data = await fromID(session.properties.userID)

	return {
		statusCode: 200,
		body: JSON.stringify(data),
	};
});