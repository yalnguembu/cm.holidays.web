<template>
  <div
    :data-test="`post-${post.id}`"
    class="border p-6 rounded-lg h-42 overflow-hidden hover:bg-gray-100 cursor-pointer hover:shadow-lg relative group"
  >
    <h4 class="text-blue-900 font-semibold text-2xl">{{ post.name }}</h4>
    <h5
      class="text-gray-900 text-lg mt-1 mb-4 hover:text-blue-500 font-medium"
    >
      {{ post.service.name }}
    </h5>
    <p class="text-gray-500 line-clamp-2 text-sm">
      {{ post.description }}
    </p>
    <ListItemOption
      :isActive="post.isActive"
      @edit="toggleEditionFormVisibility"
      @delete="toggleShouldDeletePost"
      @deactivate="toggleShouldDeactivatePost"
      @activate="toggleShouldActivatePost"
    /> 
    <PostEdition
    data-test="post-edition-modal"
    :post="post"
    v-if="shouldEditPost"
    @cancel="toggleEditionFormVisibility"
    @edited="$emit('update')"
  />
  <ConfirmationModal
    data-test="post-delete-modal"
    title="Delete Post"
    :description="`By click on the confirm button the post will ${post.name} be deleted are you agree`"
    :theme="COLOR_THEME.RED"
    @close="toggleShouldDeletePost"
    @confirm="toggleShouldDeletePost"
    v-if="shouldDeletePost"
    :isLoading="isLoading"
  />
    <ConfirmationModal
      data-test="post-activation-modal"
      title="Activate Post"
      :description="`By click on the confirm button the post ${post.name} will be activate are you agree`"
      @close="toggleShouldActivatePost"
      @confirm="toggleShouldActivatePost"
      v-if="shouldActivatePost"
      :isLoading="isLoading"
    />
    <ConfirmationModal
      data-test="post-disactivation-modal"
      title="Deactivate Post"
      :theme="COLOR_THEME.RED"
      :description="`By click on the confirm button the post will ${post.name} be deactivate are you agree`"
      @close="toggleShouldDeactivatePost"
      @confirm="toggleShouldDeactivatePost"
      v-if="shouldDeactivatePost"
      :isLoading="isLoading"
    />
  </div>
</template>
<script lang="ts" setup>
import { PropType,ref } from "vue";
import { Post } from "@/domain/Post";
import { COLOR_THEME } from "@/utils/enum";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";
import ListItemOption from "@/components/ListItemOption.vue";
import PostEdition from "@/components/modals/PostEdition.vue";

defineProps({
  post:{
    type: Object as PropType<Post>,
      requied: true
  }
});

const shouldEditPost = ref<boolean>(false);
const toggleEditionFormVisibility = () =>
  (shouldEditPost.value = !shouldEditPost.value);

const shouldDeletePost = ref<boolean>(false);
const toggleShouldDeletePost = () =>
  (shouldDeletePost.value = !shouldDeletePost.value);
const isLoading = ref<boolean>(false);

const shouldActivatePost = ref<boolean>(false);
const toggleShouldActivatePost = () =>
  (shouldActivatePost.value = !shouldActivatePost.value);

const shouldDeactivatePost = ref<boolean>(false);
const toggleShouldDeactivatePost = () =>
  (shouldDeactivatePost.value = !shouldDeactivatePost.value);
</script>
