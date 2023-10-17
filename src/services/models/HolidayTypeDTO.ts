/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HolidayRequestDTO } from './HolidayRequestDTO';

export type HolidayTypeDTO = {
    /**
     * identifier the holiday type id
     */
    id?: string;
    /**
     * holiday type description
     */
    description?: string;
    /**
     * holiday type name
     */
    name?: string;
    holidaysRequests?: Array<HolidayRequestDTO>;
};

