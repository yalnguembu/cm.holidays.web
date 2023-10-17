<template>
  <div class="mt-4">
    <label for="email" class="text-gray-500 font-semibold">{{ label }}</label>
    <div
      class="border border-gray-300 rounded-lg flex flex-row w-full justify-between align-center px-4 mt-2"
      :class="$attrs.class"
    >
      <slot />
      <input
        class="w-full px-4 py-2 bg-transparent outline-none text-gray-600"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
</script>
