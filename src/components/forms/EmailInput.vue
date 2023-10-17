<template>
  <div>
    <label for="email" class="text-gray-500 font-semibold mb-2">{{ label }}</label>
    <div
      data-test="email-field"
      :class="[
        error ? 'border-2 border-red-500' : 'border-gray-300',
        'border rounded-lg flex flex-row w-full justify-between items-center px-4',
      ]"
    >
      <MailIcon class="w-5 h-5" />
      <input
          :placeholder="placeholder"
          :value="modelValue"
          class="w-full px-0 py-2 bg-transparent outline-none text-gray-800 ml-4"
          name="email"
          type="email"
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
