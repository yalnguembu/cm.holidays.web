/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HolidayRequestDTO } from '../models/HolidayRequestDTO';
import type { HolidayStatusDTO } from '../models/HolidayStatusDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HolidayRequestService {

    /**
     * create a new holiday request
     * create a new holiday request
     * @returns string successful operation
     * @throws ApiError
     */
    public static createHolidayRequest({
        requestBody,
    }: {
        /**
         * holiday request object that need to be add
         */
        requestBody: HolidayRequestDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/holidayRequest/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-REQUEST-4001`,
                409: `HOLIDAY-REQUEST-4009`,
                500: `HOLIDAY-REQUEST-5000`,
            },
        });
    }

    /**
     * get an holiday request
     * get an holiday request
     * @returns any successful operation
     * @throws ApiError
     */
    public static getHolidayRequestById({
        id,
    }: {
        /**
         * holiday request id to be fetch
         */
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/holidayRequest/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `HOLIDAY-REQUEST-4000`,
                401: `HOLIDAY-REQUEST-4001`,
            },
        });
    }

    /**
     * update holiday request
     * update holiday request
     * @returns void
     * @throws ApiError
     */
    public static updateHolidayRequest({
        id,
        requestBody,
    }: {
        /**
         * Holiday Request id to be update
         */
        id: string,
        /**
         * Holiday Request object that need to be update
         */
        requestBody: HolidayRequestDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/holidayRequest/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `HOLIDAY-REQUEST-4000`,
                401: `HOLIDAY-REQUEST-4001`,
                404: `HOLIDAY-REQUEST-4004`,
                409: `HOLIDAY-REQUEST-4009 | HOLIDAY-REQUEST-3000`,
            },
        });
    }

    /**
     * get all holiday requests
     * get all holiday requests
     * @returns HolidayRequestDTO successful operation
     * @throws ApiError
     */
    public static getAllHolidayRequest(): CancelablePromise<Array<HolidayRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/holidayRequest/all',
            errors: {
                400: `HOLIDAY-REQUEST-4000`,
                401: `HOLIDAY-REQUEST-4001`,
            },
        });
    }

    /**
     * update a holiday request
     * update a holiday request
     * @returns void
     * @throws ApiError
     */
    public static updateHolidayRequest1({
        id,
        status,
    }: {
        /**
         * holiday request id to validate
         */
        id: string,
        /**
         * holiday status to apply
         */
        status: HolidayStatusDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/holidayRequest/{id}/status/{status}',
            path: {
                'id': id,
                'status': status,
            },
            errors: {
                400: `HOLIDAY-REQUEST-4000`,
                401: `HOLIDAY-REQUEST-4001`,
                404: `HOLIDAY-REQUEST-4004`,
            },
        });
    }

}
