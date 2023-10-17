import { DataGridColumnHeader, DataGridRow } from "@/utils/types";
import { Employee } from "@/domain/Employee";
import {dateToLocalString} from "@/utils/date";
import {USER_ROLE} from "@/utils/enum";
import {Role} from "@/domain/Role";

export const usersDataGridColumnHeaders:DataGridColumnHeader[]= [
    {
        key:"firstname",
        label:'First name',
    },
    {
        key:"lastName",
        label:'Last name',
    },
    {
        key:"email",
        label:'Email',
    },
    {
        key:"createdAt",
        label:'Creation date',
    },
    {
        key:"roles",
        label:'Roles',
    },
    {
        key:"action",
        label:'Action',
    },
];

export class UserDataGridRow implements DataGridRow {
    private readonly user: Employee;

    constructor(data:Employee) {
        this.user = data;
    }
    getId(): string {
        return this.user.id ?? "";
    }

    getTextFor(key: string): string {
        switch (key) {
            case "firstname":
                return this.user.firstname??"";
            case "lastName":
                return this.user.lastName??"";
            case "email":
                return this.user.email??"";
            case "createdAt":
                return this.user.createdAt ?? "";
            default:
                return "";
        }
    }
}

export const userHasRole = (expectedRole: USER_ROLE, roles: Role[]):boolean => !!roles.find((sessionRole)=> sessionRole.type === expectedRole)