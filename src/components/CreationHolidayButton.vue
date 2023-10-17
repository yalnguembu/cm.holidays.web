<template>
  <button
    class="text-gray-500 bg-gray-100 p-2 md:bg-blue-500 md:px-8 md:px-4 rounded-lg flex items-center"
  >
    <span class="hidden md:block text-center text-white"> New holiday </span>
    <AddIcon class="md:ml-2 block fill-gray-500 md:fill-white" />
  </button>
</template>

<script setup lang="ts">
import AddIcon from "./icons/AddIcon.vue";
</script>
