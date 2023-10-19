<template>
  <div>
    <PostCreationModal
      v-if="shouldDisplayCreationModal"
      @created="toggleShouldDisPlayCreationModal"
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
    <section class="grid grid-cols-4 gap-6 pt-8">
      <PostListItem v-for="post in posts" :post="post" @created="fetchPosts" />
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
import { ResquestStatus } from "@/utils/api";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
  (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const isPostListLoading = ref<boolean>(false);
const posts = ref<Post[]>([]);

const fetchPosts = async () => {
  isPostListLoading.value = true;
  const apiResponse = await usePostStore().getAllPosts();
  if (apiResponse.status  === ResquestStatus.SUCCESS) posts.value = apiResponse.data;
  isPostListLoading.value = false;
};

onBeforeMount(() => {
  fetchPosts();
});
</script>
