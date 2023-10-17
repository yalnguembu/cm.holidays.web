import { timestampOfOneDay } from "./common";

export const soutractTwoDates = (
  baseDate: string,
  secondDate: string
): number =>
  (new Date(baseDate).getTime() - new Date(secondDate).getTime()) /
  timestampOfOneDay;

export const fromDateToDay = (givenDate: string): number =>
  new Date(givenDate).getDay();

export const formatDate = (
  givenDate: string,
  format: DATE_FORMAT = DATE_FORMAT.HYPHEN
): string => {
  if (format === DATE_FORMAT.SPACE)
    return new Date(givenDate).toISOString().substring(0, 10);
  if (format === DATE_FORMAT.SLASH)
    return new Date(givenDate).toISOString().substring(0, 10);

  return new Date(givenDate).toISOString().substring(0, 10);
};

export const setDateToWorkingDay = (givenDate): string => {
  let date: number;
  switch (fromDateToDay(givenDate)) {
    case 6:
      date = new Date(givenDate).getTime() + timestampOfOneDay * 2;
      return new Date(date).toISOString().substring(0, 10);
    case 0:
      date = new Date(givenDate).getTime() + timestampOfOneDay;
      return new Date(date).toISOString().substring(0, 10);
    default:
      return givenDate;
  }
};

export enum DATE_FORMAT {
  SLASH = "DD/MM/YYYY",
  HYPHEN = "DD-MM-YYYY",
  SPACE = "DD MMM YYYY hh:mm",
}

export const dateToLocalString = (givenDate: string): string =>
  new Date(givenDate).toDateString();
