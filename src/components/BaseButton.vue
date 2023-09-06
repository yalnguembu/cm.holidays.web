<template>
  <button
    class="bg-blue-primary text-white text-center py-2 px-4 rounded-md font-bold text-xl shadow-xl shadow-blue-400 mb-4"
  >
    <slot name="icon" />
    {{ props.title }}
  </button>
</template>
<script setup lang="ts">
interface Props {
  title: String;
}
const props = defineProps<Props>();
</script>
