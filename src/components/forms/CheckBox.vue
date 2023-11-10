<template>
  <div>
    <input
      type="checkbox"
      name="remind"
      :checked="isChecked"
      class="border-gray-500 bg-transparent"
      @change="$emit('update:modelValue', $event?.target?.checked)"
    />
    <label for="remind" class="inline ml-2 text-gray-500 font-semibold mb-2">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});
</script>
