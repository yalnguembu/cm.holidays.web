import {defineStore} from "pinia";
import {HolidayRequest,} from "@/domain/HolidayRequest";
import {handelRequest, RequestResponse} from "@/utils/api";
import {HolidayRequestDTO, HolidayRequestService, HolidayStatusDTO} from "@/services";
import {HOLIDAY_STATUS} from "@/utils/enum";

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
      return HolidayRequestService.createHolidayRequest({
        requestBody: holiday.holidayRequestAsDTO,
      });
    });
  };

  const publishHolidayRequest = async (id):Promise<RequestResponse<void>> => {
    return handelRequest(async () => {
      await HolidayRequestService.updateHolidayRequest1({id, status: HOLIDAY_STATUS.PENDING})
      return;
    });
  }

  return {
    getHolidayRequestById,
    getHolidayRequestsByOwner,
    getAllHolidayRequests,
    createHolidayRequest,
    publishHolidayRequest
  };
});
