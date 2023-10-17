import { defineStore } from "pinia";
import { HolidayRequest, newNullHolidayRequest } from "../domain/HolidayRequest";

const holidays = [
  {
    id: "cf355daa-90af-4799-8bcf-9b03797e0d1a",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse officia vel, est facilis nobis similique voluptatibus laboriosam. Debitis quisquam nihil, ratione blanditiis dolorum natus placeat, molestias deleniti corporis beatae dolor!",
    startingDate: "2023-06-20",
    endingDate: "2023-06-30",
    createdAt: 1685577600000,
    holidayType: "Maladie",
    status: "DRAFT",
    owner:{}
  },
  {
    id: "cf355daa-90af-4799-8bcf-9b03797e0d1b",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse officia vel, est facilis nobis similique voluptatibus laboriosam. Debitis quisquam nihil, ratione blanditiis dolorum natus placeat, molestias deleniti corporis beatae dolor!",
    startingDate: "2023-06-20",
    endingDate: "2023-06-30",
    createdAt: 1685577600000,
    holidayType: "Maladie",
    status: "APPROUVED",
    owner:{}
  },
  {
    id: "cf355daa-90af-4799-8bcf-9b03797e0d1c",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse officia vel, est facilis nobis similique voluptatibus laboriosam. Debitis quisquam nihil, ratione blanditiis dolorum natus placeat, molestias deleniti corporis beatae dolor!",
    startingDate: "2023-06-20",
    endingDate: "2023-06-30",
    createdAt: 1685577600000,
    holidayType: "Maladie",
    status: "PENDING",
    owner:{}
  },
  {
    id: "cf355daa-90af-4799-8bcf-9b03797e0d1d",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse officia vel, est facilis nobis similique voluptatibus laboriosam. Debitis quisquam nihil, ratione blanditiis dolorum natus placeat, molestias deleniti corporis beatae dolor!",
    startingDate: "2023-06-20",
    endingDate: "2023-06-30",
    createdAt: 1685577600000,
    holidayType: "Maladie",
    status: "REJECTED",
    owner:{}
  },
];
export const useHolidayRequestStore = defineStore("holiday", () => {
  const getHolidayById = async (id: string): Promise<HolidayRequest> => {
    try {
      const holiday =
        holidays.find((holiday) => holiday.id === id) ?? newNullHolidayRequest();
      return new HolidayRequest(holiday);
    } catch (error: unknown) {
      console.log(error);
      return newNullHolidayRequest();
    }
  };

  const getHollidaysByOwner = async (): Promise<HolidayRequest[]> => {
    try {
      return holidays.map((holiday) => new HolidayRequest(holiday));
    } catch (error: unknown) {
      console.log(error);
      return [];
    }
  };

  const getAllHollidays = async (): Promise<HolidayRequest[]> => {
    try {
      return holidays
        .filter((holiday) => holiday.status !== "DRAFT")
        .map((holiday) => new HolidayRequest(holiday));
    } catch (error: unknown) {
      console.log(error);
      return [];
    }
  };

  const createHoliday = async (holiday: HolidayRequest): Promise<string> => {
    return "21349-23405498-3424-3432-3r342";
  };
  return {
    getHolidayById,
    getHollidaysByOwner,
    getAllHollidays,
    createHoliday,
  };
});
