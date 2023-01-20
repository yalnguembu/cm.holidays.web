<template>
  <div class="mt-4">
    <label for="email" class="text-gray-500">{{ label }}</label>
    <div
      class="border border-gray-300 rounded-lg shadow-2xl shadow-gray-200 flex flex-row w-full justify-between align-center px-4 mt-2"
      :class="$attrs.class"
    >
      <slot />
      <input
        class="w-full p-4 bg-transparent outline-none"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",

  props: {
    modelValue: String,

    name: String,

    type: String,

    placeholder: "",

    label: "",
  },

  inheritAttrs: false,
};
</script>
