import { ServiceDTO } from "@/services";
import { Post } from "./Post";

export class Service {
  isNull: boolean;

  constructor(private readonly service: ServiceDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.service.id ?? "";
  }

  get name(): string {
    return this.service.name ?? "";
  }

  set name(name: string) {
    this.service.name = name;
  }

  get description(): string {
    return this.service.description ?? "";
  }

  set description(description: string) {
    this.service.description = description;
  }

  get posts(): Post[] {
    return this.service.posts
      ? this.service.posts.map((post) => new Post(post))
      : [];
  }

  get isActive(): boolean {
    return !!this.service.isActive;
  }

  get serviceAsDTO(): ServiceDTO {
    const {id, name, description, posts} = this.service
    return {id, name, description, posts} ;
  }
}

export const newNullService = (): Service => {
  const service = new Service({});
  service.isNull = true;
  return service;
};
