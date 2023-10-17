import { DataGridColumnHeader, DataGridRow } from "./types";
import type { HolidayRequest } from "@/domain/HolidayRequest";
import { dateToLocalString } from "@/utils/date";

export const holidayRequestsDataGridColumnHeaders: DataGridColumnHeader[] = [
  {
    key: "employee",
    label: "Employee",
  },
  {
    key: "type",
    label: "Type",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "start",
    label: "Start",
  },
  {
    key: "numberOfDays",
    label: "Duration",
  },
  {
    key: "return",
    label: "Return",
  },
  {
    key: "action",
    label: "Actions",
  },
];

export class HolidayRequestDataGridRow implements DataGridRow {
  private readonly holidayRequest: HolidayRequest;

  constructor(data:HolidayRequest) {
    this.holidayRequest = data;
  }
  getId(): string {
    return this.holidayRequest.id ?? "";
  }

  getTextFor(key: string): string {
    switch (key) {
      case "employee":
        return "";
      case "start":
        return dateToLocalString(this.holidayRequest.startingDate ?? "");
      case "return":
        return dateToLocalString(this.holidayRequest.returningDate ?? "");
      case "status":
        return this.holidayRequest.status ?? "";
      case "type":
        return this.holidayRequest.holidayType ?? "";
      case "numberOfDays":
        return `${this.holidayRequest.numberOfDays} d` ?? "";
      default:
        return "";
    }
  }
}
