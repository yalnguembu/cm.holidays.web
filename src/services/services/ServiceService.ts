/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceDTO } from '../models/ServiceDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceService {

    /**
     * add a new service
     * add a new service
     * @returns string successful operation
     * @throws ApiError
     */
    public static createService({
        requestBody,
    }: {
        /**
         * Service object that need to be add
         */
        requestBody: ServiceDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/service/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-SERVICE-4001`,
                409: `HOLIDAY-SERVICE-4009`,
                500: `HOLIDAY-SERVICE-5000`,
            },
        });
    }

    /**
     * activate a new service
     * activate a new service
     * @returns void
     * @throws ApiError
     */
    public static activateServiceById({
        id,
    }: {
        /**
         * service id to activate
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/service/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                404: `HOLIDAY-SERVICE-4004`,
                409: `HOLIDAY-SERVICE-4009`,
            },
        });
    }

    /**
     * deactivate a new service
     * deactivate a new service
     * @returns void
     * @throws ApiError
     */
    public static deactivateServiceById({
        id,
    }: {
        /**
         * service id to deactivate
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/service/{id}/deactivate',
            path: {
                'id': id,
            },
            errors: {
                404: `HOLIDAY-SERVICE-4004`,
                409: `HOLIDAY-SERVICE-4009`,
            },
        });
    }

    /**
     * get all services
     * get all services
     * @returns ServiceDTO successful operation
     * @throws ApiError
     */
    public static getAllServices(): CancelablePromise<Array<ServiceDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/service/all',
            errors: {
                400: `HOLIDAY-SERVICE-4000`,
                401: `HOLIDAY-SERVICE-4001`,
            },
        });
    }

    /**
     * get a service
     * get an service
     * @returns void
     * @throws ApiError
     */
    public static getServiceById({
        id,
    }: {
        /**
         * service id to be fetch
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/service/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `HOLIDAY-SERVICE-4000`,
                401: `HOLIDAY-SERVICE-4001`,
            },
        });
    }

    /**
     * update service
     * update service
     * @returns void
     * @throws ApiError
     */
    public static updateService({
        id,
        requestBody,
    }: {
        /**
         * Service id to be update
         */
        id: string,
        /**
         * Service object that need to be update
         */
        requestBody: ServiceDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/service/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `HOLIDAY-SERVICE-4004`,
            },
        });
    }

}
