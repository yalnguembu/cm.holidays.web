import { defineStore } from "pinia";
import { Post, newNullPost } from "@/domain/Post";
import { PostService } from "@/services";
import { services } from "../../cypress/utils/data";
import { type RequestResponse, handelRequest } from "../utils/api";

const posts = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "DevOps",
    description:
      "permet la coordination et la collaboration des rôles autrefois cloisonnés (développement, opérations informatiques, ingénierie qualité et sécurité) pour créer des produits plus performants et plus fiables",
    service: services[0],
    isActive: true,
    createdAt: "2023-09-29T14:54:38.926Z",
    updatedAt: "2023-09-29T14:54:38.926Z",
  },
  {
    id: "2c963f66afa6-5717-4562-b3fc-2c963f66afa6",
    name: "UI Designer",
    description:
      "La conception d'interface utilisateur ou l'ingénierie d'interface utilisateur est la conception d'interfaces utilisateur pour des machines et des logiciels, tels que des ordinateurs, des appareils",
    service: services[1],
    isActive: true,
    createdAt: "2023-09-29T14:54:38.926Z",
    updatedAt: "2023-09-29T14:54:38.926Z",
  },
  {
    id: "3fa85f64-5717-4562-5717-2c963f66afa6",
    name: "Sale Manager",
    description:
      "permet la coordination et la collaboration des rôles autrefois cloisonnés (développement, opérations informatiques, ingénierie qualité et sécurité) pour créer des produits plus performants et plus fiables",
    service: services[2],
    isActive: false,
    createdAt: "2023-09-29T14:54:38.926Z",
    updatedAt: "2023-09-29T14:54:38.926Z",
  },
  {
    id: "2c963f66afa6-4562-4562-b3fc-3fa85f64",
    name: "Comptable",
    description:
      "La conception d'interface utilisateur ou l'ingénierie d'interface utilisateur est la conception d'interfaces utilisateur pour des machines et des logiciels, tels que des ordinateurs, des appareils",
    service: services[1],
    isActive: true,
    createdAt: "2023-09-29T14:54:38.926Z",
    updatedAt: "2023-09-29T14:54:38.926Z",
  },
];

export const usePostStore = defineStore("post", () => {
  const getAllPosts = async (): Promise<RequestResponse<Post[]>> => {
    return handelRequest(async () => {
      //const posts = await PostService.getAllPosts();
      return posts.map((post) => new Post(post));
    });
  };

  const getPostById = async (
    postId: string
  ): Promise<RequestResponse<Post>> => {
    return handelRequest(async () => {
      const post = await PostService.getPostById({ id: postId });
      return new Post(posts[0]);
    });
  };

  const createPost = async (post: Post): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () => await PostService.createPost({ requestBody: post.postAsDTO })
    );
  };

  const activatePostById = async (
    postId: string
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () => await PostService.activatePostById({ id: postId })
    );
  };

  const deactivatePostById = async (
    postId: string
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () => await PostService.deactivatePostById({ id: postId })
    );
  };

  const updatePost = async (post: Post): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>
        await PostService.updatePost({
          id: post.id,
          requestBody: post.postAsDTO,
        })
    );
  };

  return {
    getAllPosts,
    getPostById,
    createPost,
    activatePostById,
    deactivatePostById,
    updatePost,
  };
});
