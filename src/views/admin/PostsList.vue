<template>
  <div>
    <PostCreationModal
      v-if="shouldDisplayCreationModal"
      @created="
        () => {
          toggleShouldDisPlayCreationModal();
          fetchPosts();
        }
      "
      @close="toggleShouldDisPlayCreationModal"
    />
    <HeaderComponent
      title="Posts"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    >
      <CreationButton
        title="New Post"
        @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <section
      v-if="isPostListLoading"
      class="w-full flex items-center justify-center min-h-[60vh]"
    >
      <SpinnerLoader class="h-14 w-14" />
    </section>
    <section
      class="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8 xl:grid-cols-4"
      v-else-if="posts.length"
    >
      <PostListItem v-for="post in posts" :post="post" @created="fetchPosts" @updated="fetchPosts" />
    </section>
    <section
      v-else
      data-test="roles-list"
      class="h-full w-full flex flex-col justify-center items-center min-h-[60vh] 2xl:min-h-[70vh]"
    >
      <OpenFolderIcon class="stroke-gray-500/10 h-[15rem] lg:h-[20rem]" />
      <p class="text-xl text-gray-500 text-center w-1/2 2xl:w-1/4">
        No post has already been created! Please click on the button up there to
        create a new one.
      </p>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreationButton from "@/components/CreationButton.vue";
import PostCreationModal from "@/components/modals/PostCreationModal.vue";
import PostListItem from "@/components/PostListItem.vue";
import { Post } from "@/domain/Post";
import { usePostStore } from "@/store/post";
import { RequestsStatus } from "@/utils/api";
import OpenFolderIcon from "@/components/icons/OpenFolderIcon.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
  (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const isPostListLoading = ref<boolean>(false);
const posts = ref<Post[]>([]);

const fetchPosts = async () => {
  isPostListLoading.value = true;
  const apiResponse = await usePostStore().getAllPosts();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    posts.value = apiResponse.data;
  isPostListLoading.value = false;
};

onBeforeMount(() => {
  fetchPosts();
});
</script>
