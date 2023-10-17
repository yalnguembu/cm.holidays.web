/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserDTO = {
    /**
     * identifier
     */
    id: number;
    /**
     * user's creation date
     */
    createdAt: string;
    /**
     * user's updated date
     */
    updateAt?: string;
    /**
     * user's email
     */
    email: string;
    /**
     * user's firstname
     */
    firstName?: string;
    /**
     * user's lastname
     */
    lastName?: string;
};

