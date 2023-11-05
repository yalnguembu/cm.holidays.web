import { Service } from "@/domain/Service";
import type { OptionItem } from "./types";
import { formatUrl } from "./string";
import { Post } from "@/domain/Post";
import { HolidayType } from "@/domain/HolidayType";

export class ServiceOptionItem implements OptionItem {
  constructor(private readonly baseService: Service) {}

  get label ():string {
    return this.baseService.name
  }

  get key ():string {
    return formatUrl(this.baseService.name);
  }

  get valueOption ():Service {
    return this.baseService
  }
}

export class PostOptionItem implements OptionItem {
  constructor(private readonly basePost: Post) {}

  get label ():string {
    return this.basePost.name
  }

  get key ():string {
    return formatUrl(this.basePost.name);
  }

  get valueOption ():Post {
    return this.basePost
  }
}


export class HolidayTypeOption implements OptionItem {
  constructor (private readonly holidayType: HolidayType){}

  get label(): string{
    return this.holidayType.name ?? ""
  }

  get key(): string{
    return this.holidayType.id ??""
  }

  get valueOption(): unknown{
    return this.holidayType
  }
}