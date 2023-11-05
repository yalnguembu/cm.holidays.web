import { PostDTO } from "@/services";
import { Service, newNullService } from "./Service";

export class Post {
  isNull = true;

  constructor(private readonly post: PostDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.post.id ?? "";
  }

  get name(): string {
    return this.post.name ?? "";
  }

  set name(name: string) {
    this.post.name = name;
  }

  get description(): string {
    return this.post.description ?? "";
  }

  set description(description: string) {
    this.post.description = description;
  }

  get service(): Service {
    return this.post.service
      ? new Service(this.post.service)
      : newNullService();
  }

  set service(service) {
    this.service = new Service(service);
  }

  get isActive(): boolean {
    return !!this.post.isActive;
  }

  get postAsDTO(): PostDTO {
    const { id, name, description} = this.post
    return { id, name, description, service: {...this.service.serviceAsDTO } };
  }
}

export const newNullPost = (): Post => {
  const post = new Post({});
  post.isNull = true;
  return post;
};
