/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AuthResponseDTO = {
    /**
     * user's id
     */
    id: number;
    /**
     * user's email
     */
    email?: string;
    /**
     * user's name
     */
    name?: string;
    /**
     * user's picture
     */
    picture?: string;
    /**
     * user's accessToken
     */
    access_token: string;
    /**
     * user's refreshToken
     */
    refresh_token: string;
};

