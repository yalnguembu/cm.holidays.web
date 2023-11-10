import {RoleDTO, USER_ROLE} from "@/services";

export class Role {
  isNull: boolean;

  constructor(private readonly role: RoleDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.role.id ?? "";
  }

  get type(): string {
    return this.role.type ?? "";
  }

  set type(type: string) {
    this.role.type = USER_ROLE[type as keyof  typeof USER_ROLE];
  }

  get description(): string {
    return this.role.description ?? "";
  }

  set description(description: string) {
    this.role.description = description;
  }


  get isActive ():boolean{
    return this.role.isActive
  }

  get roleAsDTO(): RoleDTO {
    return this.role;
  }
}

export const newNullRole = (): Role => {
  const role = new Role({});
  role.isNull = true;
  return role;
};
