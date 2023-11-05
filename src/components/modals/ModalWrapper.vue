<template>
  <main
    class="animate-fadeIn fixed top-0 left-0 w-screen h-screen flex flex-row items-center justify-center z-40 bg-gray-500/25 backdrop-blur-[2px]"
  >
    <article ref="modal">
      <slot @close="emit('close')" />
    </article>
  </main>
</template>
<style>
.animate-fadeIn {
  animation-name: fadeIn;
  animation-duration: 300ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    bottom: 0;
    transform: translateY(0%);
  }
}
</style>
<script setup lang="ts">
import { ref } from "vue";
import { useDetectOutsideClick } from "@/utils/outsideClick";

const modal = ref<HTMLDivElement>();

const emit = defineEmits(["close"]);

useDetectOutsideClick(modal, () => {
  emit("close");
});
</script>
