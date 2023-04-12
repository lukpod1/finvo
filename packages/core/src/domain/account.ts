export default class Account {
    id: string;
    balance: number;
    name: string;
    userId: string;

    constructor(id: string, balance: number, name: string, userId: string) {
        this.id = id;
        this.balance = balance;
        this.name = name;
        this.userId = userId;
    }
}