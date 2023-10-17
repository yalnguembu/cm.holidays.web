/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HolidayTypeDTO } from '../models/HolidayTypeDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HolidayTypeService {

    /**
     * create a new holiday type
     * create a new holiday type
     * @returns string successful operation
     * @throws ApiError
     */
    public static createHolidayType({
        requestBody,
    }: {
        /**
         * holiday type object that need to be add
         */
        requestBody: HolidayTypeDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/holidayType/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-TYPE-4001`,
                409: `HOLIDAY-TYPE-4009`,
                500: `HOLIDAY-TYPE-5000`,
            },
        });
    }

    /**
     * get all holiday types
     * get all holiday types
     * @returns HolidayTypeDTO successful operation
     * @throws ApiError
     */
    public static getAllHolidayTypes(): CancelablePromise<Array<HolidayTypeDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/holidayType/all',
            errors: {
                400: `HOLIDAY-TYPE-4000`,
                401: `HOLIDAY-TYPE-4001`,
            },
        });
    }

}
