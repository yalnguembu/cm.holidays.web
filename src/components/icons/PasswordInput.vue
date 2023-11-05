<template>
  <div>
    <label for="email" class="text-gray-500 font-semibold mb-2">{{ label }}</label>
    <div
      data-test="password-field"
      :class="[
        'border rounded-lg flex flex-row w-full justify-between items-center px-4',
        error ? 'border-2 border-red-500' : 'border border-gray-300',
      ]"
    >
      <LockIcon class="mt-4 w-4 h-4" />
      <input
        class="w-full px-0 py-2 bg-transparent outline-none text-gray-800 ml-4"
        type="password"
        name="email"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p
      class="text-red-600 mt-2 transition duration-500"
      v-if="error"
      data-test="password-input-text-error"
    >
      {{ error }}
    </p>
  </div>
</template>
<script setup lang="ts">
import LockIcon from "./LockIcon.vue";

const props = defineProps<{
  error: string;
  modelValue: string;
  label: string;
  placeholder: string;
}>();
</script>
