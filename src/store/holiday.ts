import { defineStore } from "pinia";
import { Holiday, newNullHoliday } from "../domain/Holiday";

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
  },
];
export const useHolidayStore = defineStore("holiday", () => {
  const getHolidayById = async (id: string): Promise<Holiday> => {
    try {
      const holiday =
        holidays.find((holiday) => holiday.id === id) ?? newNullHoliday();
      return new Holiday(holiday);
    } catch (error: unknown) {
      console.log(error);
      return newNullHoliday();
    }
  };

  const getHollidaysByOwner = async (): Promise<Holiday[]> => {
    try {
      return holidays.map((holiday) => new Holiday(holiday));
    } catch (error: unknown) {
      console.log(error);
      return [];
    }
  };

  const getAllHollidays = async (): Promise<Holiday[]> => {
    try {
      return holidays
        .filter((holiday) => holiday.status !== "DRAFT")
        .map((holiday) => new Holiday(holiday));
    } catch (error: unknown) {
      console.log(error);
      return [];
    }
  };

  const createHoliday = async (holiday: Holiday): Promise<string> => {
    return "21349-23405498-3424-3432-3r342";
  };
  return {
    getHolidayById,
    getHollidaysByOwner,
    getAllHollidays,
    createHoliday,
  };
});
