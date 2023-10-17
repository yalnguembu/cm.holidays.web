/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HolidayRequestDTO } from './HolidayRequestDTO';
import type { PostDTO } from './PostDTO';
import type { RoleDTO } from './RoleDTO';
import type { SettingDTO } from './SettingDTO';

export type EmployeeDTO = {
    /**
     * identifier the user id
     */
    id?: string;
    /**
     * user firstname
     */
    firstname?: string;
    /**
     * user lastname
     */
    lastName?: string;
    /**
     * user email
     */
    email?: string;
    /**
     * user arriving date
     */
    createdAt?: string;
    /**
     * user updating date
     */
    updatedAt?: string;
    roles?: Array<RoleDTO>;
    /**
     * holidays request for a user
     */
    holidays?: Array<HolidayRequestDTO>;
    setting?: SettingDTO;
    posts?: Array<PostDTO>;
};

