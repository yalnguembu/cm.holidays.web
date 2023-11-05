<template>
  <div>
    <label for="description" class="text-md text-gray-700 font-semibold"> {{ label }} </label>
    <textarea
      id="description"
      name="description"
      :placeholder="placeholder"
      :value="modelValue"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        { 'border-2 border-red-500': error },
        'text-md text-gray-700 h-24 w-full bg-gray-25 md:bg-transparent border rounded-md p-4 outline-none',
      ]"
    />
    <p class="text-red-500 mb-2" v-if="error" data-test="textarea-input-text-error">
      {{ error }}
    </p>
  </div>
</template>
<script setup lang="ts">

interface Props {
  label: string;
  modelValue: string;
  placeholder?: string;
  error?: string;
  readonly?: boolean;
  rows?:number;
}

const props = defineProps<Props>();
</script>
