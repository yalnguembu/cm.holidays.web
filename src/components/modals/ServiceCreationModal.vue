<template>
  <ModalWrapper @close="$emit('close')">
    <form
      data-test="service-creation-form"
      class="w-92 border rounded-xl p-6 shadow-lg bg-white"
    >
      <div>
        <h2 class="text-2xl font-bold text-center mb-4" data-test="form-title">
          New service
        </h2>
      </div>
      <TextField
        label="Name"
        data-test="holiday-type"
        placeholder="Enter you title here"
        v-model="service.name"
        :error="error.name"
      />
      <TextArea
          v-model="service.description"
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
            @click="$emit('close')"
        />
        <BaseButton
            :class="['w-full shadow-none text-base mt-4 font-semibold md:mt-0',shouldCreationService ? 'bg-blue-primary text-white hover:shadow-blue-primary hover:shadow-md cursor-pointer' :'bg-blue-primary/40 cursor-not-allowed text-gray-500']"
            :disabled="!shouldCreationService"
            data-test="submit-button"
            title="Create"
            @click="create"
        />
      </div>
    </form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import TextArea from "@/components/forms/TextArea.vue";
import TextField from "@/components/forms/TextField.vue";
import {reactive, ref} from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import {Service} from "@/domain/Service";
import { useServiceStore} from "@/store/service";
import {computed} from "@vue/runtime-core";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

interface serviceType{
  name: string,
  description: string,
}
const service = reactive<serviceType>({
  name: "",
  description: "",
});

const error = reactive<serviceType>({
  name: "",
  description: "",
});

const isProcessing = ref<boolean>(false);

const shouldCreationService = computed(()=> !!service.name && !isProcessing.value)
const create = async () => {
  isProcessing.value = true;
  const newService = new Service(service)
  await useServiceStore().createService(newService);
  isProcessing.value = false;
  emit('created');
};
const close = (): void => {
  emit("close");
};
</script>