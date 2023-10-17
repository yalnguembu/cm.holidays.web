/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SettingDTO = {
    /**
     * identifier the setting
     */
    id?: string;
    /**
     * default email notification which will be the company email
     */
    defaultEmailNotification?: string;
    /**
     * another email notification chose by the user
     */
    customEmailNotification?: string;
};

