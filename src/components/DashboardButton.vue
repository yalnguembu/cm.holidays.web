<template>
  <RouterLink
      :to="path"
      :title="title"
      class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 inline-block md:h-72 text-gray-500 hover:text-blue-primary"
  >
    <component
        :is="icon"
        class="mr-4 h-[40px] stroke-2 stoke-gray-500"
    />
    <br />
    <span class="text-xl font-bold mt-8">{{ label }}</span>
  </RouterLink>
</template>
<script setup lang="ts">
defineProps({
  path:{
    type: String,
    required: true
  },
  label:{
    type: String,
    required: true
  },
  title:{
    type: String,
  },
  icon: {
    type: Object,
    required: true
  }
})
</script>