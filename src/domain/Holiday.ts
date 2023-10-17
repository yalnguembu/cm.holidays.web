import { HOLIDAY_STATUS } from "../utils/enum";

export class Holiday {
  isNull = true;
  constructor(
    private holiday: {
      id: string;
      description: string;
      startingDate: string;
      endingDate: string;
      createdAt: number;
      holidayType: string;
      status: string;
    }
  ) {
    this.isNull = false;
  }

  public get id(): string {
    return this.holiday.id ?? "";
  }

  public get description(): string {
    return this.holiday.description ?? "";
  }

  public get startingDate(): string {
    return this.holiday.startingDate ?? "";
  }

  public get endingDate(): string {
    return this.holiday.endingDate ?? "";
  }

  public get createdAt(): number {
    return this.holiday.createdAt ?? Date.now();
  }

  public get holidayType(): string {
    return this.holiday.holidayType ?? "";
  }

  public get status(): HOLIDAY_STATUS {
    return (
      HOLIDAY_STATUS[this.holiday.status ?? "DRAFT"] ?? HOLIDAY_STATUS.DRAFT
    );
  }
}

export const newNullHoliday = (): Holiday => {
  const holiday: Holiday = new Holiday({});
  holiday.isNull = true;
  return holiday;
};
