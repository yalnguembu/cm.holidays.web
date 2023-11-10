import { defineStore } from "pinia";
import { Employee } from "@/domain/Employee";
import { EmployeeService } from "@/services";
import {type  RequestResponse, handelRequest } from "@/utils/api";

export const useEmployeeStore = defineStore("employee", () => {
  const getAllEmployees = async (): Promise<RequestResponse<void>> => {
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
