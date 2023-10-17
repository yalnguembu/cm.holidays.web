/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PostDTO } from './PostDTO';
import type { RoleDTO } from './RoleDTO';

export type EmployeeDTOForCreation = {
    /**
     * user firstname
     */
    firstname?: string;
    /**
     * user lastname
     */
    lastName?: string;
    /**
     * user password
     */
    password?: string;
    /**
     * user email
     */
    email?: string;
    roles?: Array<RoleDTO>;
    posts?: Array<PostDTO>;
};

