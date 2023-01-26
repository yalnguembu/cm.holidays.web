<template>
  <input
    type="text"
    class="border border-gray-300 rounded-lg shadow-2xl shadow-gray-200 text-xl text-center p-4 w-14 h-14 bg-gray-100"
    :name="name"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "DigitInput",

  props: {
    modelValue: String,
    name: String,
  },
};
</script>