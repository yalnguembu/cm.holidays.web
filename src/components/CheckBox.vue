<template>
  <div>
    <input
      type="checkbox"
      name="remind"
      class="border-gray-500 bg-transparent"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label for="remind" class="inline text-gray-500 ml-2"> {{ label }} </label>
  </div>
</template>

<script>
export default {
  name: "CheckBox",

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
