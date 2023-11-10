import { defineStore } from "pinia";
import { Post } from "@/domain/Post";
import { PostService } from "@/services";
import { type RequestResponse, handelRequest } from "@/utils/api";

export const usePostStore = defineStore("post", () => {
  const getAllPosts = async (): Promise<RequestResponse<Post[]>> => {
    return handelRequest(async () => {
      const posts = await PostService.getAllPosts();
      return posts.map((post) => new Post(post));
    });
  };

  const getPostById = async (
    postId: string
  ): Promise<RequestResponse<Post>> => {
    return handelRequest(async () => {
      const post = await PostService.getPostById({ id: postId });
      return new Post(post);
    });
  };

  const createPost = async (post: Post): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>  await PostService.createPost({ requestBody: post.postAsDTO })
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
