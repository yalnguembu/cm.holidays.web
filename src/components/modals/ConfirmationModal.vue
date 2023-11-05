<template>
  <ModalWrapper @close="$emit('close')">
    <div
      class="w-[30rem] min-h-[15rem] bg-white shadow rounded-lg flex justify-center items-center md:px-8 p-8"
    >
      <SpinnerLoader v-if="isLoading" />
      <div v-else class="w-full">
        <h2 class="text-2xl font-bold">{{ title }}</h2>
        <p class="text-lg text-gray-500 mt-8">
          {{ description }}
        </p>
        <div class="flex justify-end mt-8">
          <BaseButton
            @click="emits('close')"
            title="Cancel"
            class="text-base shadow-none text-black font-normal bg-gray-200 hover:bg-gray-300 hover:shadow-md"
          />
          <BaseButton
            title="Confirm"
            @click="$emit('confirm')"
            :class="['ml-4 shadow-none', theme]"
          />
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>
<style scoped>
.BLUE {
  @apply bg-blue-primary text-white text-base hover:shadow-md hover:shadow-blue-400;
}
.RED {
  @apply bg-red-500 text-white text-base hover:shadow-md hover:shadow-red-400;
}
</style>
<script setup lang="ts">
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import BaseButton from "@/components/BaseButton.vue";
import { COLOR_THEME } from "@/utils/enum";
import { PropType } from "vue";
import SpinnerLoader from "../SpinnerLoader.vue";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  theme: {
    type: String as PropType<COLOR_THEME>,
    default: COLOR_THEME.BLUE,
  },
});

const emits = defineEmits<{
  (event: "close"): void;
  (event: "confirm"): void;
}>();
</script>
