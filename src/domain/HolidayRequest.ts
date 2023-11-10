import { HOLIDAY_STATUS } from "@/utils/enum";
import { HolidayRequestDTO } from "@/services";
import { HolidayType, newNullHolidayType } from "./HolidayType";
import { Employee } from "./Employee";
import {soutractTwoDates} from "@/utils/date";

export class HolidayRequest {
  isNull = true;
  constructor(private holidayRequest: HolidayRequestDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.holidayRequest.id ?? "";
  }

  get type(): HolidayType {
    return this.holidayRequest.type
      ? new HolidayType(this.holidayRequest.type)
      : newNullHolidayType();
  }

  get description(): string {
    return this.holidayRequest.description ?? "";
  }

  get startingDate(): string {
    return this.holidayRequest.startingDate ?? "";
  }

  get endingDate(): string {
    return this.holidayRequest.endingDate ?? "";
  }

  get returningDate(): string {
    return this.holidayRequest.returningDate ?? "";
  }

  get numberOfDays(): number {
    return soutractTwoDates(this.endingDate, this.startingDate);
  }

  get createdAt(): string {
    return this.holidayRequest.createdAt ?? ""
  }

  get creationDate(): string {
    return new Date().toUTCString();
  }

  get holidayType(): string {
    return "";
  }

  get status(): HOLIDAY_STATUS {
    return HOLIDAY_STATUS[this.holidayRequest.status ?? "DRAFT"];
  }

  set employee(employee: Employee) {
    this.holidayRequest.employee = employee.employeeAsDTO;
  }

  get holidayRequestAsDTO(): HolidayRequestDTO {
    console.log(this.holidayRequest);
    return this.holidayRequest;
  }
}

export const newNullHolidayRequest = (): HolidayRequest => {
  const holidayRequest: HolidayRequest = new HolidayRequest(
    {} as HolidayRequestDTO
  );
  holidayRequest.isNull = true;
  return holidayRequest;
};
