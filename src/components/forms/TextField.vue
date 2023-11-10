<template>
  <div >
    <label for="email" class="text-gray-500 font-semibold mb-2 px-1">
      {{ label }} <span v-if="isRequired" class="text-red-500">*</span>
    </label>
    <div
      class="border border-gray-300 rounded-lg flex flex-row w-full justify-between align-center px-4"
      :class="$attrs.class"
    >
      <slot />
      <input
        class="w-full px-0 py-2 bg-transparent outline-none text-gray-800"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event?.target?.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  isRequired: {
    type: Boolean,
    default: false,
  }
});
</script>
