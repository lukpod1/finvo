export class User {
    id: string;
    email: string;
    name: string;
    picture: string;

    constructor(id: string, email: string, name: string, picture: string) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.picture = picture;
    }
}
