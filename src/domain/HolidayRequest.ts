import { HOLIDAY_STATUS } from "@/utils/enum";
import { HolidayRequestDTO } from "@/services";
import { soutractTwoDates } from "@/utils/date";

export class HolidayRequest {
  isNull = true;
  constructor(private holidayRequest: HolidayRequestDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.holidayRequest.id ?? "";
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

  get numberOfDays(): string {
    return soutractTwoDates(this.endingDate, this.startingDate);
  }

  get createdAt(): number {
    return this.holidayRequest.createdAt ?? "";
  }

  get holidayType(): string {
    return this.holidayRequest.holidayType ?? "";
  }

  get status(): HOLIDAY_STATUS {
    return HOLIDAY_STATUS[this.holidayRequest.status ?? "DRAFT"];
  }
}

export const newNullHolidayRequest = (): HolidayRequest => {
  const holidayRequest: HolidayRequest = new HolidayRequest(
    {} as HolidayRequestDTO
  );
  holidayRequest.isNull = true;
  return holidayRequest;
};
