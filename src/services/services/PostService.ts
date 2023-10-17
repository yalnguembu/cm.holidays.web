/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostDTO } from '../models/PostDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostService {

    /**
     * add a new post
     * add a new post
     * @returns string successful operation
     * @throws ApiError
     */
    public static createPost({
        requestBody,
    }: {
        /**
         * Post object that need to be add
         */
        requestBody: PostDTO,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/post/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `HOLIDAY-POST-4001`,
                409: `HOLIDAY-POST-4009`,
                500: `HOLIDAY-POST-5000`,
            },
        });
    }

    /**
     * activate a new post
     * activate a new post
     * @returns any successful operation
     * @throws ApiError
     */
    public static activatePostById({
        id,
    }: {
        /**
         * post id to activate
         */
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/post/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                401: `HOLIDAY-POST-4001`,
                409: `HOLIDAY-POST-4009`,
            },
        });
    }

    /**
     * deactivate a new post
     * deactivate a new post
     * @returns void
     * @throws ApiError
     */
    public static deactivatePostById({
        id,
    }: {
        /**
         * post id to deactivate
         */
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/post/{id}/deactivate',
            path: {
                'id': id,
            },
            errors: {
                404: `HOLIDAY-POST-4004`,
                409: `HOLIDAY-POST-4009`,
            },
        });
    }

    /**
     * get all posts
     * get all posts
     * @returns PostDTO successful operation
     * @throws ApiError
     */
    public static getAllPosts(): CancelablePromise<Array<PostDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/all',
            errors: {
                400: `HOLIDAY-POST-4000`,
                401: `HOLIDAY-POST-4001`,
            },
        });
    }

    /**
     * get a post
     * get a post
     * @returns any successful operation
     * @throws ApiError
     */
    public static getPostById({
        id,
    }: {
        /**
         * post id to be fetch
         */
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `HOLIDAY-POST-4000`,
                401: `HOLIDAY-POST-4001`,
            },
        });
    }

    /**
     * update post
     * update post
     * @returns void
     * @throws ApiError
     */
    public static updatePost({
        id,
        requestBody,
    }: {
        /**
         * Post id to be update
         */
        id: string,
        /**
         * Post object that need to be update
         */
        requestBody: PostDTO,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/post/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `HOLIDAY-POST-4004`,
            },
        });
    }

    /**
     * get a post by service
     * get a post
     * @returns any successful operation
     * @throws ApiError
     */
    public static getPostByServiceId({
        id,
    }: {
        /**
         * service id to be use to fetch posts
         */
        id: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/post/service/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `HOLIDAY-EMPLOYEE-4001`,
                404: `HOLIDAY-SERVICE-4004`,
            },
        });
    }

}
