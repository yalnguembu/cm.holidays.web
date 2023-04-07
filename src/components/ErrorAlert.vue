<template>
  <div class="bg-red-200 border-l-4 border-red-500 p-4" data-test="error-alert">
    <p class="text-red-500 font-bold">
      <InfoIcon class="mr-2 align-middle" />
      {{ title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import InfoIcon from "./icons/InfoIcon.vue";

const props = defineProps<{ title: string }>();
</script>
