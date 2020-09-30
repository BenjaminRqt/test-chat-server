export class User {
    private readonly _username : string
    private readonly _password : string

    constructor(username: string, password: string) {
        this._username = username
        this._password = password
    }

    get password(): string {
        return this._password;
    }
    get username(): string {
        return this._username;
    }
}
