/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HolidayRequestDTO } from '../models/HolidayRequestDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HolidayRequestService {

    /**
     * fetch all holidayRequests
     * fetch all holidayRequest
     * @returns HolidayRequestDTO holidayRequests successfull fecthed
     * @throws ApiError
     */
    public static getAllHolidayRequests(): CancelablePromise<Array<HolidayRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/holidayRequests/',
            errors: {
                403: `access forbidden`,
            },
        });
    }

    /**
     * create new holidayRequest
     * create new holidayRequest
     * @returns HolidayRequestDTO holidayRequest created successfully
     * @throws ApiError
     */
    public static createHolidayRequest({
        requestBody,
    }: {
        /**
         * holidayRequest informations needed to create new holidayRequest
         */
        requestBody: HolidayRequestDTO,
    }): CancelablePromise<HolidayRequestDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/holidayRequest',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `access forbidden`,
            },
        });
    }

    /**
     * fetch all holidayRequests
     * fetch all by id
     * @returns HolidayRequestDTO holidayRequests successfull fecthed
     * @throws ApiError
     */
    public static getHolidayRequestById({
        id,
    }: {
        /**
         * the holidayRequest's id to get
         */
        id: string,
    }): CancelablePromise<HolidayRequestDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/holidayRequest/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `access forbidden`,
            },
        });
    }

}
