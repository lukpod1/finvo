import { ApiHandler, useQueryParam } from "sst/node/api";
import { getTransactions } from "./find";

export const handler = ApiHandler(async (event) => {
	const userId = useQueryParam("userId");

	try {
		const transactions = await getTransactions(userId);

		return {
			statusCode: 200,
			body: JSON.stringify(transactions),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify(error),
		};
	}
});