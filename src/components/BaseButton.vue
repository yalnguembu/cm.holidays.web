<template>
  <button
    class="bg-blue-primary text-white text-center p-4 rounded-md font-bold text-xl shadow-xl shadow-blue-400 mb-4"
  >
    <slot />
    {{ title }}
  </button>
</template>
<script>
export default {
  name:"BaseButton",
  props: {
    title: String,
  },
};
</script>
