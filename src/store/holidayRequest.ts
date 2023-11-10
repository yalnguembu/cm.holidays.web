import { defineStore } from "pinia";
import {
  HolidayRequest,
} from "@/domain/HolidayRequest";
import { RequestResponse, handelRequest } from "@/utils/api";
import { HolidayRequestDTO, HolidayRequestService } from "@/services";

export const useHolidayRequestStore = defineStore("holiday", () => {
  const getHolidayRequestById = async (
    id: string
  ): Promise<RequestResponse<HolidayRequest>> => {
    let holidayRequest: HolidayRequestDTO;

    return handelRequest(async () => {
      holidayRequest = await HolidayRequestService.getHolidayRequestById({
        id,
      });
      return new HolidayRequest(holidayRequest);
    });
  };

  const getHolidayRequestsByOwner = async (): Promise<
    RequestResponse<HolidayRequest[]>
  > => {
    let holidayRequests: HolidayRequestDTO[] = [];

    return handelRequest(async () => {
      holidayRequests = await HolidayRequestService.getAllHolidayRequest();
      return holidayRequests.map(
        (holidayRequest) => new HolidayRequest(holidayRequest)
      );
    });
  };

  const getAllHolidayRequests = async (): Promise<
    RequestResponse<HolidayRequest[]>
  > => {
    let holidayRequests: HolidayRequestDTO[] = [];

    return handelRequest(async () => {
      holidayRequests = await HolidayRequestService.getAllHolidayRequest();
      return holidayRequests.map(
        (holidayRequest) => new HolidayRequest(holidayRequest)
      );
    });
  };

  const createHolidayRequest = async (
    holiday: HolidayRequest
  ): Promise<RequestResponse<string>> => {
    return handelRequest(async () => {
      return await HolidayRequestService.createHolidayRequest({
        requestBody: holiday.holidayRequestAsDTO,
      });
    });
  };
  return {
    getHolidayRequestById,
    getHolidayRequestsByOwner,
    getAllHolidayRequests,
    createHolidayRequest,
  };
});
