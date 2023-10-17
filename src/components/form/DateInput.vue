<template>
  <div>
    <label class="text-md text-gray-500 mr-2"> {{ label }} </label>
    <div
      :class="[
        ' border rounded-md w-full px-2 mt-2  bg-gray-25 md:bg-transparent relative',
        { 'border-blue-500 border-2': focused },
        { 'border-red-500 border-2': error },
      ]"
      data-test="date-input-container"
    >
      <input
        type="date"
        class="bg-transparent w-full p-2 outline-none"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target?.value)"
      />
      <span class="absolute top-2 right-4 pointer-events-none"
        ><AgendaIcon
      /></span>
    </div>
    <p class="text-red-500" v-if="error" data-test="date-input-text-error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AgendaIcon from "../icons/AgendaIcon.vue";

interface Props {
  label: string;
  modelValue: string;
  error?: string;
  readonly?: boolean;
}

defineProps<Props>();

const focused = ref<boolean>(false);
</script>
