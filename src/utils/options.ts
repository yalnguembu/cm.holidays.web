import { Service } from "@/domain/Service";
import type { OptionItem } from "./types";
import { formatUrl } from "./string";
import { Post } from "@/domain/Post";

export class ServiceOptionItem implements OptionItem {
  constructor(private readonly baseService: Service) {}

  get label ():string {
    return this.baseService.name
  }  
  
  get key ():string {
    return formatUrl(this.baseService.name);
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
}

