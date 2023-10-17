/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceDTO } from './ServiceDTO';

export type PostDTO = {
    /**
     * service identifier
     */
    id?: string;
    /**
     * service name
     */
    name?: string;
    /**
     * department description
     */
    description?: string;
    service?: ServiceDTO;
    /**
     * describe if the post is active or not
     */
    isActive?: boolean;
    /**
     * service creation date
     */
    createdAt?: string;
    /**
     * service modification date
     */
    updatedAt?: string;
};

