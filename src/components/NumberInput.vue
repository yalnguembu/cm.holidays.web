<template>
  <label for="number" class="text-md text-gray-500">
    {{ label }}
  </label>
  <input
    type="number"
    id="number"
    :placeholder="placeholder"
    :readonly="readonly"
    class="w-full border border-gray-300 bg-gray-25 md:bg-transparent rounded-md w-full p-4 mt-2 outline-blue-500"
    :value="modelValue"
  />
</template>
<script>
export default {
  name: "NumberInput",

  props: {
    modelValue: [Number,String],
    placeholder: String,
    label: String,
    readonly: Boolean,
  },
};
</script>
