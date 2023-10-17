<template>
  <button
    class="text-gray-500 bg-gray-100 p-2 md:bg-blue-primary md:px-4 rounded-lg flex items-center hover:shadow-lg shadow-blue-500 lg:px-3"
  >
    <AddIcon class="md:mr-3 block fill-gray-500 md:fill-white" />
    <span class="hidden md:block text-center text-white"> {{ title }} </span>
  </button>
</template>

<script setup lang="ts">
import AddIcon from "./icons/AddIcon.vue";
defineProps({
  title: {
    type: String,
    default: "New",
  },
});
</script>
