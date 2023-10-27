import { EmployeeDTO } from "@/services";
import { Post } from "./Post";
import { Role } from "./Role";
import { HolidayRequest } from "./HolidayRequest";

export class Employee {
  isNull: boolean;

  constructor(private readonly employee: EmployeeDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.employee.id ?? "";
  }

  get firstname(): string {
    return this.employee.firstname ?? "";
  }

  set firstname(firstname: string) {
    this.employee.firstname = firstname;
  }

  get lastName(): string {
    return this.employee.lastName ?? "";
  }

  set lastName(lastName: string) {
    this.employee.lastName = lastName;
  }

  get email(): string {
    return this.employee.email ?? "";
  }

  get createdAt(): string {
    return this.employee.createdAt ?? "";
  }

  get posts(): Post[] {
    return this.employee.posts?.map((post) => new Post(post));
  }

  set posts (posts:Post[]){
    this.employee.posts = posts;
  }

  get roles(): Role[] {
    return this.employee.roles?.map((role) => new Role(role));
  }

  set roles(roles: Role[]) {
    this.employee.roles = roles;
  }

  get holidays(): HolidayRequest[] {
    return this.employee.holidays?.map((holiday) => new HolidayRequest(holiday));
  }

  get employeeAsDTO(): EmployeeDTO {
    return this.employee;
  }
}

export const newNullEmployee = (): Employee => {
  const employee = new Employee({});
  employee.isNull = true;
  return employee;
};
