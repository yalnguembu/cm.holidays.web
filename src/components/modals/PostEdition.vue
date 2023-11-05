<template>
  <ModalWrapper @close="$emit('cancel')">
    <form
      method="post"
      @submit.prevent="save"
      data-test="post-creation-form"
      class="w-92 border rounded-xl p-6 shadow-lg bg-white"
    >
      <div>
        <h2 class="text-2xl font-bold text-center mb-4" data-test="form-title">
          Edit post
        </h2>
      </div>
      <TextField
        label="Name"
        data-test="holiday-type"
        placeholder="Enter you title here"
        v-model.trim="post.name"
        :error="error.name"
      />
      <SelectInput
        class="mt-3"
        data-test="holiday-type"
        label="Service"
        placeholder="Select a service"
        :options="serviceOptions"
        v-model="post.service"
        :isLoading="isLoadingServices"
      />
      <TextArea
        v-model.trim="post.description"
        :error="error.description"
        class="mt-4"
        label="Description"
        placeholder="Enter the description"
      />
      <div class="grid md:grid-cols-2 mt-3 gap-x-4">
        <BaseButton
          class="w-full shadow-none text-base mt-4 hover:shadow-md bg-blue-100 font-semibold text-gray-700 md:mt-0"
          data-test="submit-button"
          title="cancel"
          type="reset"
          @click="$emit('cancel')"
        />
        <BaseButton
          :class="[
            'w-full shadow-none text-base mt-4 font-semibold md:mt-0',
            shouldSaveModification
              ? 'bg-blue-primary text-white hover:shadow-blue-primary hover:shadow-md cursor-pointer'
              : 'bg-blue-primary/40 cursor-not-allowed text-gray-500',
          ]"
          :disabled="!shouldSaveModification"
          data-test="submit-button"
          title="Save"
          type="submit"
        />
      </div>
    </form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import TextArea from "@/components/forms/TextArea.vue";
import TextField from "@/components/forms/TextField.vue";
import SelectInput from "@/components/forms/SelectInput.vue";
import {onBeforeMount, PropType, reactive, ref, watchEffect} from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import { Post } from "@/domain/Post";
import { usePostStore } from "@/store/post";
import { computed } from "@vue/runtime-core";
import { useServiceStore } from "@/store/service";
import { Service } from "@/domain/Service";
import { ServiceOptionItem } from "@/utils/options";
import {RequestsStatus} from "@/utils/api";

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true,
  },
});
const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "edited"): void;
}>();

const isLoadingServices = ref<boolean>(false);
const fetchedServices = ref<Service[]>([]);
const serviceOptions = computed((): ServiceOptionItem[] =>
    fetchedServices.value.map((service) => new ServiceOptionItem(service))
);

const fetchServices = async (): Promise<void> => {
  isLoadingServices.value = true;
  const apiResponse = await useServiceStore().getAllServices();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    fetchedServices.value = apiResponse.data ?? [];
  isLoadingServices.value = false;
};

onBeforeMount(()=>{
  fetchServices()
})

const post = reactive({
      name: props.post?.name ?? "",
      description: props.post?.description ?? "",
      service: new ServiceOptionItem(props.post.service)
});

const error = reactive<{
  name: string;
  description: string;
}>({
  name: "",
  description: "",
});

const isProcessing = ref<boolean>(false);

const shouldSaveModification = computed((): boolean => {
  const oldValue = JSON.stringify({
    name: props.post?.name,
    description: props.post?.description,
    service: props.post?.service
  });
  const newValue = JSON.stringify({
    name: post.name,
    description: post.description,
    service: post?.service
  });
  return oldValue !== newValue && !isProcessing.value;
});

const save = async () => {
  isProcessing.value = true;
  const newPost = new Post({
    id:props.post?.id,
    name: post.name,
    description: post.description,
    service: post.service.baseService.serviceAsDTO
  })
  await usePostStore().updatePost(newPost);
  isProcessing.value = false;
  emit("edited");
};
</script>
