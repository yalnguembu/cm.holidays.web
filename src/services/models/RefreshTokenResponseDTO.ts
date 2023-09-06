/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RefreshTokenResponseDTO = {
    /**
     * user's id
     */
    id: number;
    /**
     * user's email
     */
    email: string;
    /**
     * user's email
     */
    name?: string;
    /**
     * user's email
     */
    picture?: string;
    /**
     * user's accessToken
     */
    access_token: string;
};

