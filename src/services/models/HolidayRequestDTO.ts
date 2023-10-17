/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmployeeDTO } from './EmployeeDTO';
import type { HolidayStatusDTO } from './HolidayStatusDTO';
import type { HolidayTypeDTO } from './HolidayTypeDTO';

export type HolidayRequestDTO = {
    /**
     * identifier the holiday id
     */
    id?: string;
    /**
     * holiday request description
     */
    description?: string;
    /**
     * user arriving date
     */
    startingDate?: string;
    /**
     * user updating date
     */
    endingDate?: string;
    /**
     * user updating date
     */
    returningDate?: string;
    type?: HolidayTypeDTO;
    status?: HolidayStatusDTO;
    employee?: EmployeeDTO;
};

