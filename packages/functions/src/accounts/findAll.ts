import { ApiHandler, useQueryParam } from "sst/node/api";
import { getAccounts } from "./find";

export const handler = ApiHandler(async (event) => {
	const userId = useQueryParam("userId");
	console.log("userId", userId);

	try {
		const accounts = await getAccounts(userId);

		return {
			statusCode: 200,
			body: JSON.stringify(accounts),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify(error),
		};
	}
});