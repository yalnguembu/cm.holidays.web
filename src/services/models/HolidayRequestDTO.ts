/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HolidayRequestDTO = {
    /**
     * identifier
     */
    id: string;
    /**
     * holidayRequest's title
     */
    title: string;
    /**
     * holidayRequest's content
     */
    content?: string;
    /**
     * holidayRequest's creation date
     */
    createdAt?: string;
    /**
     * holidayRequest's holidayTypes
     */
    holidayTypes?: string;
    /**
     * holidayRequest's startDate
     */
    startDate?: string;
    /**
     * holidayRequest's endDate
     */
    endDate?: string;
    /**
     * holidayRequest's returnDate
     */
    returnDate?: string;
    /**
     * holidayRequest's description
     */
    status?: string;
    /**
     * holidayRequest's ownerId
     */
    ownerId?: string;
};

