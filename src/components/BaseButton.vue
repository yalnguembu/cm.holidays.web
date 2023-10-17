<template>
  <button
    class="text-center py-2 px-4 rounded-md font-bold text-xl"
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
