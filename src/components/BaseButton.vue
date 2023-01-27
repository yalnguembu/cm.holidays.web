<template>
  <button
    class="bg-blue-primary text-white text-center p-4 rounded-md font-bold text-xl shadow-xl shadow-blue-400 mb-4"
  >
    <slot name="icon" />
    {{ props.title }}
  </button>
</template>
<script setup>
const props = defineProps({
  title: { type: String, require: true },
});

</script>
