export class Credential {
    constructor(private readonly  credential : {
        email: string,
        password : string,
    }) {}

    get email (): string{
        return this.credential.email
    }

    get password (): string{
        return this.credential.password
    }

    get credentialAsDTO (){
        return {...this.credential}
    }
}