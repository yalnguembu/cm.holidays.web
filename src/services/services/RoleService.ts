/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoleDTO } from '../models/RoleDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoleService {

    /**
     * add a new role
     * add a new role
     * @returns string successful operation
     * @throws ApiError
     */
    public static createRole({
        requestBody,
    }: {
        /**
         * Role object that need to be add
         */
        requestBody: RoleDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/role/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-ROLE-4001`,
                409: `HOLIDAY-ROLE-4009`,
                500: `HOLIDAY-ROLE-5000`,
            },
        });
    }

    /**
     * get an role
     * get an role
     * @returns any successful operation
     * @throws ApiError
     */
    public static getRoleById({
        id,
    }: {
        /**
         * role id to be fetch
         */
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/role/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `HOLIDAY-ROLE-4000`,
                401: `HOLIDAY-ROLE-4001`,
            },
        });
    }

    /**
     * update role
     * update role
     * @returns void
     * @throws ApiError
     */
    public static updateRole({
        id,
        requestBody,
    }: {
        /**
         * Role id to be update
         */
        id: string,
        /**
         * Role object that need to be update
         */
        requestBody: RoleDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/role/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `HOLIDAY-ROLE-4004`,
            },
        });
    }

    /**
     * get all roles
     * get all roles
     * @returns RoleDTO successful operation
     * @throws ApiError
     */
    public static getAllRoles(): CancelablePromise<Array<RoleDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/role/all',
            errors: {
                400: `HOLIDAY-ROLE-4000`,
                401: `HOLIDAY-ROLE-4001`,
            },
        });
    }

    /**
     * assign permissions to role
     * assign permissions to role
     * @returns any successful operation
     * @throws ApiError
     */
    public static assignPermissionToRoleId({
        id,
        requestBody,
    }: {
        /**
         * post id to activate
         */
        id: string,
        /**
         * List of permissions that need to be add to this role
         */
        requestBody: RoleDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/role/{id}/assign-permissions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-POST-4001`,
                409: `HOLIDAY-POST-4009`,
            },
        });
    }

    /**
     * activate a new role
     * activate a new role
     * @returns any successful operation
     * @throws ApiError
     */
    public static activateRoleById({
        id,
    }: {
        /**
         * role id to activate
         */
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/role/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                401: `HOLIDAY-ROLE-4001`,
                409: `HOLIDAY-ROLE-4009`,
            },
        });
    }

    /**
     * deactivate a new role
     * deactivate a new role
     * @returns void
     * @throws ApiError
     */
    public static deactivateRoleById({
        id,
    }: {
        /**
         * role id to deactivate
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/role/{id}/deactivate',
            path: {
                'id': id,
            },
            errors: {
                404: `HOLIDAY-ROLE-4004`,
                409: `HOLIDAY-ROLE-4009`,
            },
        });
    }

}
