<template>
  <div>
    <label for="email" class="text-gray-500">{{ label }}</label>
    <div
      data-test="password-field"
      :class="[
        'rounded-lg shadow-2xl shadow-gray-200 flex flex-row w-full justify-between align-center px-4 my-2  bg-gray md:bg-transparent',
        error ? 'border-2 border-red-500' : 'border border-gray-300',
      ]"
    >
      <LockIcon class="mt-2 w-5 h-5" />
      <input
        class="w-full px-4 py-2 bg-transparent outline-none"
        type="password"
        name="email"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target?.value)"
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
import LockIcon from "../icons/LockIcon.vue";

interface Props {
  label: string;
  modelValue: string;
  placeholder?: string;
  error?: string;
  readonly?: boolean;
}

const props = defineProps<Props>();
</script>
