<template>
  <ModalWrapper v-if="isOffline" @close="$emit('close')">
    <div
      class="w-[30rem] min-h-[15rem] bg-white shadow rounded-lg flex flex-col justify-center items-center md:px-8 p-8 text-center"
    >
      <h2 class="text-2xl font-bold">It seem that you are Offline</h2>
      <OfflineIcon class="stroke-gray-500 h-32 w-32 mt-8" />
        <p class="text-lg text-gray-500 mt-8 px-8">
          Please check your network source then retry
        </p>
        <BaseButton title="Try again" class="bg-red-500 text-white mt-8 w-3/4" />
    </div>
  </ModalWrapper>
  <div v-else />
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
import OfflineIcon from "@/components/icons/OfflineIcon.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import {useRoute} from "vue-router";

const emits = defineEmits<{
  (event: "close"): void;
}>();
const route = useRoute()
const isOffline = ref<boolean>(false);
const toggleOnlineListener = ()=> isOffline.value = !isOffline.value;

onMounted(()=>{
  window.addEventListener('online', toggleOnlineListener);
  window.addEventListener('offline', toggleOnlineListener);
});

onBeforeUnmount(()=>{
  window.removeEventListener("click", toggleOnlineListener);
  window.removeEventListener("click", toggleOnlineListener);
});

if(!navigator.onLine && !route.meta?.isPublic){
  console.log()
  isOffline.value = true;
}
</script>
