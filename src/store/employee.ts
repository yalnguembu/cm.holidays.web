import { defineStore } from "pinia";
import { Employee } from "@/domain/Employee";
import { EmployeeService } from "@/services";
import {type  RequestResponse, handelRequest } from "@/utils/api";

const employees = [
  {
    id: "bcad-1234-abcd-1234",
    firstname: "firstname",
    lastName: "lastName",
    email: "email@gmail.com",
    createdAt: "2023/09/06",
    roles: [
      {
        id: "abcd-1234-abcd-1234",
        type: "EMPLOYEE",
      },
    ],
    holidays: [],
    posts: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "DevOps",
      },
    ],
  },
];

export const useEmployeeStore = defineStore("employee", () => {
  const getAllEmployees = async (): Promise<void> => {
    return handelRequest(async () => {
      const employees = await EmployeeService.getAllEmployees();
      return employees.map((employee) => new Employee(employee));
    });
  };

  const getEmployeeById = async (
    employeeId: string
  ): Promise<RequestResponse<Employee>> => {
    return handelRequest(async () => {
      const employee = await EmployeeService.getEmployeeById({
        id: employeeId,
      });
      return new Employee(employee);
    });
  };

  const createEmployee = async (
    employee: Employee
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>
        await EmployeeService.createEmployee({
          requestBody: employee.employeeAsDTO,
        })
    );
  };

  const updateEmployee = async (
    employee: Employee
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>
        await EmployeeService.updateEmployee({
          id: employee.id,
          requestBody: employee.employeeAsDTO,
        })
    );
  };

  return {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
  };
});
