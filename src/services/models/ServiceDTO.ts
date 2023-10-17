/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PostDTO } from './PostDTO';

export type ServiceDTO = {
    /**
     * service identifier
     */
    id?: string;
    /**
     * service name
     */
    name?: string;
    /**
     * All the posts present in this service
     */
    posts?: Array<PostDTO>;
    /**
     * service description
     */
    description?: string;
    /**
     * describe if the service is active or not
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

