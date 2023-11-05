<template>
  <div
    :data-test="`service-${id}`"
    class="border p-6 rounded-lg h-42 overflow-hidden hover:bg-gray-100/30 cursor-pointer hover:shadow-lg relative group"
  >
    <h4 class="text-blue-900 font-semibold text-2xl mb-4">
      {{ name }}
    </h4>
    <p class="text-gray-500 text-sm line-clamp-3">
      {{ description }}
    </p>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
