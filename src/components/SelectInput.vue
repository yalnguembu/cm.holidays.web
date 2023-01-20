<template>
  <label for="type" class="text-md text-gray-500"> {{ label }} </label>
  <select
    ref="selectInput"
    id="type"
    name="type"
    :class="[
      ' w-full border rounded-md w-full p-4 mt-2 bg-gray-25 outline-blue-500 inset-blue-500 md:bg-transparent',
      { 'border-2 border-red-500': error },
    ]"
    :value="modelValue"
    @change="send"
  >
    <option
      v-for="(option, index) in options"
      :key="option"
      :value="option"
      :hidden="index === 0"
    >
      {{ option }}
    </option>
  </select>
  <p v-if="error" class="text-red-500" data-test="select-input-text-error">
    {{ error }}
  </p>
</template>
<script>
export default {
  name: "SelectInput",

  props: {
    modelValue: String,
    options: Array[String],
    error: String,
    label: String,
  },
  methods: {
    send(event) {
      console.log( event.target.value);
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
