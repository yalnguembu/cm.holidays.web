import { HolidayTypeDTO } from "@/services";

export class HolidayType {
  isNull = true;

  constructor(private readonly holidayType: HolidayTypeDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.holidayType.id ?? "";
  }

  get name(): string {
    return this.holidayType.name ?? "";
  }

  get description(): string {
    return this.holidayType.description ?? "";
  }

  get holidayTypeAsDTO(): HolidayTypeDTO {
    return this.holidayType;
  }
}

export const newNullHolidayType = (): HolidayType => {
  const holidayType = new HolidayType({});
  holidayType.isNull =true;
  return holidayType
};
