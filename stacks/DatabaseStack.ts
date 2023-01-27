import { StackContext, Table } from "@serverless-stack/resources";

export function DatabaseStack({ stack }: StackContext) {

    const table = new Table(stack, "users", {
        fields: {
            userId: "string"
        },
        primaryIndex: {
            partitionKey: "userId"
        }
    })

    return table
}