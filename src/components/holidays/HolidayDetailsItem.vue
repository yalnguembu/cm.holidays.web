<template>
  <div>
    <h6 class="text-gray-500">{{ label }}</h6>
    <p class="font-bold">{{ value }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
