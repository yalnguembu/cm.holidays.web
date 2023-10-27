<template>
  <ModalWrapper @close="$emit('close')">
    <div class="border rounded-xl p-6 shadow-lg bg-white">
      <div
        v-if="isLoading"
        class="w-[20rem] h-[20rem] flex items-center justify-center"
      >
        <SpinnerLoader />
      </div>
      <form
        v-else
        method="post"
        @submit.prevent="save"
        data-test="service-creation-form"
        class="w-92"
      >
        <div>
          <h2
            class="text-2xl font-bold text-center mb-4"
            data-test="form-title"
          >
            Edit service
          </h2>
        </div>
        <TextField
          label="Name"
          data-test="holiday-type"
          placeholder="Enter you title here"
          v-model.trim="service.name"
          :error="error.name"
        />
        <TextArea
          v-model.trim="service.description"
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
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import TextArea from "@/components/forms/TextArea.vue";
import TextField from "@/components/forms/TextField.vue";
import { PropType, reactive, ref } from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import SpinnerLoader from "../SpinnerLoader.vue";
import { Service } from "@/domain/Service";
import { useServiceStore } from "@/store/service";
import { computed } from "@vue/runtime-core";
import { ResquestStatus } from "@/utils/api";

const props = defineProps({
  service: {
    type: Object as PropType<Service>,
    required: true,
  },
});
const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "created"): void;
}>();

const service = reactive({
  name: props.service.name,
  description: props.service.description,
});

const isLoading = ref<boolean>(false);

const error = reactive<{
  name: string;
  description: string;
}>({
  name: "",
  description: "",
});

const shouldSaveModification = computed((): boolean => {
  const oldValue = JSON.stringify({
    name: props.service.name,
    description: props.service.description,
  });
  const newValue = JSON.stringify({
    name: service.name,
    description: service.description,
  });
  return oldValue !== newValue && !isLoading.value;
});

const save = async () => {
  isLoading.value = true;
  const updatedService = new Service({
    id: props.service.id,
    name: service.name,
    description: props.service.description,
  });
  const editionResponse = await useServiceStore().updateService(updatedService);

  if (editionResponse.status === ResquestStatus.SUCCESS) emit("created");

  isLoading.value = false;
};
</script>
