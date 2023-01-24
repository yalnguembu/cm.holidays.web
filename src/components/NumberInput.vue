<template>
  <div>
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
  </div>
</template>
<script>
export default {
  name: "NumberInput",

  props: {
    modelValue: {
      tyepe: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: true,
      default: "",
    },
    readonly: Boolean,
  },
};
</script>
