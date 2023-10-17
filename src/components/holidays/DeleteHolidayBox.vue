<template>
  <div class="w-full flex justify-center items-center md:px-8 md:min-h-[25vh]">
    <div class="w-full flex flex-col">
      <div class="items-center flex flex-col justify-center" v-if="isDeleting">
        <div
          class="w-20 h-20 rounded-full border-8 border-gray-100 dark:border-gray-400 relative animate-spin"
        >
          <div
            class="w-4 h-4 absolute -top-1 left-0 rounded-full bg-blue-500"
          />
        </div>
        <p class="text-gray-500 text-lg mt-4">Deleting</p>
      </div>
      <div
        class="items-center flex flex-col justify-center"
        v-else-if="isDeleted"
      >
        <CheckCircleIcon class="w-24 h-24 stroke-gray-500" />
        <p class="text-gray-500 text-lg mt-4">HolidayRequest request deleted</p>
      </div>
      <template v-else>
        <h2 class="text-2xl font-bold">Supprimer</h2>
        <p class="text-lg text-gray-500 mt-8">
          Etes vous sure de voulair vraiment effacer cette demande?
        </p>
        <div class="self-end mt-8">
          <BaseButton
            @click="emits('close')"
            title="Cancel"
            class="text-base shadow-none text-black font-normal bg-gray-200 hover:bg-gray-300 hover:shadow"
          />
          <BaseButton
            title="Yes, delete"
            @click="deleteThisHolidayRequest"
            class="ml-4 shadow-none bg-red-600/90 text-base hover:bg-red-600 hover:shadow hover:shadow-red-400"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import BaseButton from "../BaseButton.vue";
import CheckCircleIcon from "../icons/CheckCircleIcon.vue";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const emits = defineEmits<{
  (event: "close"): void;
  (event:'deleted'):void
}>();

const isDeleting = ref<boolean>(false);
const isDeleted = ref<boolean>(false);
const deleteThisHolidayRequest = () => {
  isDeleting.value = true;
  setTimeout(() => {
    isDeleting.value = false;
    isDeleted.value = true;
  }, 1000);

  setTimeout(() => {
    emits('deleted');
  }, 2000);
};
</script>
