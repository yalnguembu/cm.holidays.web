<template>
  <ModalWrapper @close="$emit('close')">
    <div
      data-test="post-creation-form"
      class="w-92 border rounded-xl p-6 shadow-lg bg-white"
    >
      <div>
        <h2 class="text-2xl font-bold text-center mb-4" data-test="form-title">
          New Post
        </h2>
      </div>
      <TextField
        label="Title"
        data-test="holiday-type"
        placeholder="Enter the post's name"
        v-model="post.name"
        :error="error.name"
      />
      <SelectInput
        class="mt-3"
        data-test="holiday-type"
        label="Service"
        placeholder="Select a service"
        :isLoading="isLoadingServices"
        :options="serviceOptions"
        v-model="post.service"
        :error="error.service"
      />
      <TextArea
        placeholder="Enter the description"
        label="Description"
        v-model="post.description"
        :error="error.description"
      />
      <div class="grid md:grid-cols-2 mt-3 gap-x-4">
        <BaseButton
          @click="$emit('close')"
          title="Cancel"
          data-test="submit-button"
          class="w-full shadow-none text-base mt-4 hover:shadow-md bg-blue-100 font-semibold text-gray-800 md:mt-0"
        />
        <BaseButton
          :title="isLoading ? 'Saving' : 'Create'"
          :disabled="!shouldCreatePost"
          data-test="submit-button"
          @click="create"
          :class="[
            'w-full shadow-none text-base mt-4 font-semibold md:mt-0',
            shouldCreatePost
              ? 'bg-blue-primary text-white hover:shadow-blue-primary hover:shadow-md cursor-pointer'
              : ' bg-blue-primary/30 text-gray-500 cursor-not-allowed',
          ]"
        />
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import TextArea from "@/components/forms/TextArea.vue";
import TextField from "@/components/forms/TextField.vue";
import SelectInput from "@/components/forms/SelectInput.vue";
import { reactive, computed, ref, onBeforeMount, watchEffect } from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import { HolidayErrors } from "@/utils/type";
import { useServiceStore } from "@/store/service";
import { Service, newNullService } from "@/domain/Service";
import { ServiceOptionItem } from "@/utils/options";
import { usePostStore } from "@/store/post";
import { Post } from "@/domain/Post";
import { RequestsStatus } from "@/utils/api";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

const isProcessing = ref<boolean>(false);
const isLoadingServices = ref<boolean>(false);
const fetchedServices = ref<Service[]>([]);

const fetchServices = async (): Promise<void> => {
  isLoadingServices.value = true;
  const apiResponse = await useServiceStore().getAllServices();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    fetchedServices.value = apiResponse.data ?? [];
  isLoadingServices.value = false;
};

const serviceOptions = computed(() =>
  fetchedServices.value.map((service) => new ServiceOptionItem(service))
);

onBeforeMount(() => {
  fetchServices();
});

const post = reactive({
  name: "",
  description: "",
  service: newNullService(),
});
const isLoading = ref<boolean>(false);

const shouldCreatePost = computed(
  () => !!post.name && !!post.service && !isProcessing.value && !isLoading.value
);

const error = reactive<HolidayErrors>({
  name: "",
  description: "",
  service: "",
});

const create = async () => {
  isLoading.value = true;

  const newPost = new Post({
    name: post.name,
    description: post.description,
    service: post.service.serviceAsDTO,
  });

  const apiResponse = await usePostStore().createPost(newPost);
  if (apiResponse.status === RequestsStatus.SUCCESS) emit("created");

  isLoading.value = false;
};
</script>
