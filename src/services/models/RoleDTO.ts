/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { USER_ROLE } from './USER_ROLE';

export type RoleDTO = {
    /**
     * identifier the role
     */
    id?: string;
    type?: USER_ROLE;
    /**
     * role description
     */
    description?: string;
};

