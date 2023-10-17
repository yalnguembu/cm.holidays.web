/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmployeeDTO } from '../models/EmployeeDTO';
import type { EmployeeDTOForCreation } from '../models/EmployeeDTOForCreation';
import type { EmployeeDTOForLogin } from '../models/EmployeeDTOForLogin';
import type { EmployeeDTOForUpdate } from '../models/EmployeeDTOForUpdate';
import type { EmployeeTokenDTO } from '../models/EmployeeTokenDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EmployeeService {

    /**
     * add a new employee
     * add a new employee
     * @returns EmployeeTokenDTO successful operation
     * @throws ApiError
     */
    public static createEmployee({
        requestBody,
    }: {
        /**
         * Employee object that need to be add
         */
        requestBody: EmployeeDTOForCreation,
    }): CancelablePromise<EmployeeTokenDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/employee/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-EMPLOYEE-4001`,
                409: `HOLIDAY-EMPLOYEE-4009`,
                500: `HOLIDAY-EMPLOYEE-5000`,
            },
        });
    }

    /**
     * get all employees
     * get all employees
     * @returns EmployeeDTO successful operation
     * @throws ApiError
     */
    public static getAllEmployees(): CancelablePromise<Array<EmployeeDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employee/all',
            errors: {
                400: `HOLIDAY-EMPLOYEE-4000`,
                401: `HOLIDAY-EMPLOYEE-4001`,
            },
        });
    }

    /**
     * employee authentication
     * employee authentication
     * @returns EmployeeTokenDTO successful operation
     * @throws ApiError
     */
    public static authenticateEmployee({
        requestBody,
    }: {
        /**
         * Employee object that we need to authenticate the user
         */
        requestBody: EmployeeDTOForLogin,
    }): CancelablePromise<EmployeeTokenDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/employee',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `HOLIDAY-EMPLOYEE-4004`,
            },
        });
    }

    /**
     * get an employee
     * get an employee
     * @returns any successful operation
     * @throws ApiError
     */
    public static getEmployeeById({
        id,
    }: {
        /**
         * employee id to be fetch
         */
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employee/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `HOLIDAY-EMPLOYEE-4000`,
                401: `HOLIDAY-EMPLOYEE-4001`,
                404: `HOLIDAY-EMPLOYEE-4004`,
                409: `HOLIDAY-EMPLOYEE-4009`,
            },
        });
    }

    /**
     * update employee
     * update employee
     * @returns void
     * @throws ApiError
     */
    public static updateEmployee({
        id,
        requestBody,
    }: {
        /**
         * Employee id to be update
         */
        id: string,
        /**
         * Employee object that need to be update
         */
        requestBody: EmployeeDTOForUpdate,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/employee/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `HOLIDAY-EMPLOYEE-4004`,
            },
        });
    }

}
