import { defineStore } from "pinia";
import { Employee, newNullEmployee } from "@/domain/Employee";
import {EmployeeService} from "@/services";

export const useEmployeeStore = defineStore("employee", () => {
  const getAllEmployees = async (): Promise<Employee[]> => {
    try {
      const employees = await EmployeeService.getAllEmployees();
      return employees.map((employee) => new Employee(employee));
    } catch (error: unknown) {
      console.log(error);
      return [];
    }
  };
  const getEmployeeById = async (employeeId: string): Promise<Employee> => {
    try {
      const employee = await EmployeeService.getEmployeeById({id:employeeId});
      return new Employee(employee);
    } catch (error: unknown) {
      console.log(error);
      return newNullEmployee();
    }
  };

  const createEmployee = async (employee: Employee): Promise<void> => {
    try {
      await EmployeeService.createEmployee({requestBody: employee.employeeAsDTO});
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const updateEmployee = async (employee: Employee): Promise<void> => {
    try {
      await EmployeeService.updateEmployee({id: employee.id, requestBody: employee.employeeAsDTO});
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee
  };
});
