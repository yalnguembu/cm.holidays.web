import { EmployeeDTO } from "@/services";
import {Role} from "@/domain/Role";
import {Post} from "@/domain/Post";

type SessionType = EmployeeDTO;

export class Session {
    private session: SessionType;
    isNull = true;

    constructor(session : SessionType) {
        this.session =  session
        this.isNull=  false
    }

    get id() : string{
      return  this.session.id ?? ""
    }

    get email() : string{
        return this.session.email ?? "";
    }

    set email(email: string) {
        this.session.email = email;
    }

    get lastName() : string{
        return this.session.lastName ?? "";
    }

    get firstname() : string{
        return this.session.firstname ?? "";
    }

    get fullName(): string{
        return `${this.lastName} ${this.firstname}`;
    }

    get creationDate(): string {
        return this.session.createdAt ?? "";
    }

    get posts(): Post[]{
        return this.session.posts ? this.session.posts.map((post)=> new Post(post)) :[];
    }


    get roles ():Role[]{
        return this.session.roles
          ? this.session.roles.map((role) => new Role(role))
          : [];
    }
}

export const  newNullSession =()=> {
    const session=    new Session({} as SessionType);
    session.isNull=true;
    return session;
};
