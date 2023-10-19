import { DataGridColumnHeader, DataGridRow } from "@/utils/types";
import { Employee } from "@/domain/Employee";
import { dateToLocalString } from "@/utils/date";
import { USER_ROLE } from "@/utils/enum";
import { Role } from "@/domain/Role";

export const usersDataGridColumnHeaders: DataGridColumnHeader[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "createdAt",
    label: "Creation date",
  },
  {
    key: "roles",
    label: "Roles",
  },
  {
    key: "action",
    label: "Action",
  },
];

export class UserToDataGridRow implements DataGridRow {
  constructor(private readonly user: Employee) {}

  getId(): string {
    return this.user.id;
  }

  getTextFor(key: string): string | string[] {
    switch (key) {
      case "name":
        console.log('heao');
        
        return `${this.user.lastName} ${this.user.firstname}`;
      case "email":
        return this.user.email;
      case "createdAt":
        return dateToLocalString(this.user.createdAt);
      case "roles":
        return this.user.roles.map((role) => role.type).join(", ");
      default:
        return "";
    }
  }
}
"".split(", ").join()
export const userHasRole = (expectedRole: USER_ROLE, roles: Role[]): boolean =>
  !!roles.find((sessionRole) => sessionRole.type === expectedRole);
