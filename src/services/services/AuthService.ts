/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessTokenDTO } from '../models/AccessTokenDTO';
import type { AuthDTO } from '../models/AuthDTO';
import type { AuthResponseDTO } from '../models/AuthResponseDTO';
import type { RefreshTokenDTO } from '../models/RefreshTokenDTO';
import type { RefreshTokenResponseDTO } from '../models/RefreshTokenResponseDTO';
import type { SignUpDTO } from '../models/SignUpDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Singin the user
     * Signin the user
     * @returns AuthResponseDTO successfull sigin
     * @throws ApiError
     */
    public static signin({
        requestBody,
    }: {
        /**
         * Auth object that we need to signin
         */
        requestBody: AuthDTO,
    }): CancelablePromise<AuthResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signin',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `wrong crudentials`,
            },
        });
    }

    /**
     * Signup the user
     * Signup the user
     * @returns AuthResponseDTO successfull sigin
     * @throws ApiError
     */
    public static signup({
        requestBody,
    }: {
        /**
         * Auth object that we need to signup
         */
        requestBody: SignUpDTO,
    }): CancelablePromise<AuthResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `wrong crudentials`,
            },
        });
    }

    /**
     * refresh the user token
     * refresh the user token
     * @returns RefreshTokenResponseDTO token refreshed successfully
     * @throws ApiError
     */
    public static refreshToken({
        requestBody,
    }: {
        /**
         * refresh token that we need to refresh the token
         */
        requestBody: RefreshTokenDTO,
    }): CancelablePromise<RefreshTokenResponseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `invalid refresh token`,
            },
        });
    }

    /**
     * verify the user token
     * verify the user token
     * @returns any token verifyhed successfully
     * @throws ApiError
     */
    public static verifyToken({
        requestBody,
    }: {
        /**
         * verify token that we need to verify the token
         */
        requestBody: AccessTokenDTO,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/verify-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `invalid refresh token`,
            },
        });
    }

}
