<template>
  <li class="flex items-center w-full hover:bg-gray-100 font-normal p-3 px-4" :data-test="label">
    <component v-if="icon" :is="icon" class="mr-2 h-6 w-6" />
    <span class="px-2">{{ label }}</span>
  </li>
</template>
<script setup lang="ts">
defineProps({
  icon:{
    type: Object
  },
  label:{
    type: String,
    required: true
  }
})
</script>