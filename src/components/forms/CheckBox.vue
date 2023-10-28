<template>
  <div>
    <input
      type="checkbox"
      name="remind"
      :value="value"
      class="border-gray-500 bg-transparent"
      @change="emit('update:modelValue', value)"
    />
    <label for="remind" class="inline ml-2 text-gray-500 font-semibold mb-2">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Object as PropType<unknown>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Object as PropType<unknown>,
  },
});
</script>
