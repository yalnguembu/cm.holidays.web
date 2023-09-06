<template>
  <div>
    <label for="email" class="text-gray-500">{{ label }}</label>
    <div
      data-test="email-field"
      :class="[
        error ? 'border-2 border-red-500' : 'border-gray-300',
        'border rounded-lg shadow-2xl shadow-gray-200 flex flex-row w-full justify-between align-center px-4 mt-2',
      ]"
    >
      <MailIcon class="mt-2 w-6 h-6" />
      <input
        class="w-full px-4 py-2 bg-transparent outline-none"
        type="email"
        name="email"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target?.value)"
      />
    </div>
    <p
      class="text-red-600 mt-2 transition duration-500"
      v-if="error"
      data-test="email-input-text-error"
    >
      This field is required
    </p>
  </div>
</template>
<script setup lang="ts">
import MailIcon from "../icons/MailIcon.vue";

interface Props {
  label: string;
  modelValue: string;
  placeholder?: string;
  error?: string;
  readonly?: boolean;
}

const props = defineProps<Props>();
</script>
