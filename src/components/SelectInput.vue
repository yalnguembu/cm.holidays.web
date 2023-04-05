<template>
  <div>
    <label for="type" class="text-md text-gray-500"> {{ label }} </label>
    <select
      ref="selectInput"
      id="type"
      :class="[
        ' w-full border rounded-md w-full p-4 mt-2 bg-gray-25 outline-blue-500 inset-blue-500 md:bg-transparent',
        { 'border-2 border-red-500': error },
      ]"
      :value="modelValue === '' ? defaultOption : modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
      <option hidden selected data-test="default-option">
        {{ defaultOption }}
      </option>
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        data-test="select-option"
      >
        {{ option }}
      </option>
    </select>
    <p v-if="error" class="text-red-500" data-test="select-input-text-error">
      {{ error }}
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  options: string[];
  error: string;
  label: string;
  defaultOption: string;
}>();
</script>
