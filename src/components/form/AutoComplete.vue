<template>
  <div>
    <label v-if="label" class="text-md text-gray-500 mr-2">{{ label }} </label>
    <div
      :class="[
        ['border rounded-md w-full p-2 mt-2 relative'],
        isFocused && ['border-blue-500', 'border-2'],
      ]"
    >
      <div class="flex">
        <input
          class="bg-transparent w-3/4 px-2 outline-none"
          type="text"
          v-model="input"
          :placeholder="placeholder"
          @focus="toggleFocus"
        />
      </div>
      <ul
        class="bg-white shadow-lg rounded-lg absolute top-12 border left-0 w-full z-20"
        v-show="isFocused"
      >
        <li
          class="p-4 cursor-pointer hover:bg-gray-100"
          v-for="option in filteredOptions"
          :key="option"
          @click="select(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  options: {
    type: Array<string>,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  label: {
    type: String,
  },
  defaultOption: {
    type: String,
  },
});

const active = ref<string>(props.modelValue);
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const filteredOptions = ref<string[]>(props.options);
const isFocused = ref<boolean>(false);

const select = (option: string): void => {
  emit("update:modelValue", option);
  toggleFocus();
  input.value = active.value;
};
const toggleFocus = () => (isFocused.value = !isFocused.value);
const input = ref<string>(props.modelValue);
watch(input, (text) => {
  if (!text) {
    filteredOptions.value = props.options;
  } else {
    filteredOptions.value = props.options.filter((option: string) =>
      option.includes(text)
    );
  }
});
</script>
