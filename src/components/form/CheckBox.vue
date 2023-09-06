<template>
  <div>
    <input
      type="checkbox"
      name="remind"
      class="border-gray-500 bg-transparent"
      :checked="props.modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <label for="remind" class="inline text-gray-500 ml-2">
      {{ props.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props{
  modelValue: Boolean,
  label:  String,
}

const emit = defineEmits(['update:modelValue'])
const props = defineProps<Props>();
</script>
