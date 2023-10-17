/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PostDTO } from './PostDTO';
import type { RoleDTO } from './RoleDTO';

export type EmployeeDTOForUpdate = {
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
    roles?: Array<RoleDTO>;
    posts?: Array<PostDTO>;
};

