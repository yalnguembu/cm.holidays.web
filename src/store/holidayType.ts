import { defineStore } from "pinia";
import { HolidayType } from "@/domain/HolidayType";
import { HolidayTypeService, PostService } from "@/services";
import { type RequestResponse, handelRequest } from "@/utils/api";

export const useHolidayTypeStore = defineStore("holidayType", () => {
  const getAllHolidayTypes = async (): Promise<RequestResponse<HolidayType[]>> => {
    return handelRequest(async () => {
      const holidayType = await HolidayTypeService.getAllHolidayTypes();
      return holidayType.map((holidayType) => new HolidayType(holidayType));
    });
  };

  const createHolidayType = async (holidayType: HolidayType): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>  await HolidayTypeService.createHolidayType({ requestBody: holidayType.holidayTypeAsDTO })
    );
  };

  return {
    getAllHolidayTypes,
    createHolidayType,
  };
});
