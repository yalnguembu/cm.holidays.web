import { Service } from "@/domain/Service";
import type { OptionItem } from "./types";
import { formatUrl } from "./string";

export class ServiceOptionItem implements OptionItem {
  constructor(private readonly service: Service) {}

  get label ():string {
    return this.service.name
  }  
  
  get key ():string {
    return formatUrl(this.service.name);
  }
}
