export class Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: string;
    accountId: string;
    userId: string;

    constructor(id: string, amount: number, date: string, description: string, type: string, accountId: string, userId: string) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.type = type;
        this.accountId = accountId;
        this.userId = userId;
    }
}