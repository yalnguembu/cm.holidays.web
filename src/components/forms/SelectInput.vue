<template>
  <div class="block">
    <label class="text-gray-500 font-semibold">{{ props.label }}</label>
    <div
      data-test="select-input"
      class="w-full relative bg-white z-10 pb-3 mt-2"
    >
      <div class="flex items-center px-4 rounded border">
        <input
          type="text"
          class="px-0 py-2 w-full bg-transparent outline-none text-gray-800"
          :placeholder="placeholder"
          v-model.trim="text"
          @focus="toggleShouldDisplayOptions"
          @click.stop=""
        />
        <ArrowDownIcon
          @click.stop="toggleShouldDisplayOptions"
          :class="[
            'stroke-1 w-3 h-3 transition duration-300',
            { 'rotate-180': shouldDisplayOptions },
          ]"
        />
      </div>
      <ul
        ref="optionsList"
        class="w-full absolute top-12 left-0 bg-white rounded shadow"
        v-if="shouldDisplayOptions"
      >
        <template v-if="options.length">
          <li
            class="px-4 py-2 hover:bg-gray-100 cursor-ponter text-gray-600"
            v-for="(option) in options"
            :key="options.key"
            @click="handelSelect(option)"
          >
            {{ option.label }}
          </li>
        </template>
        <div v-else-if="isLoading" class="p-3 w-full flex justify-center items-center">
          <SpinnerLoader class="w-10 h-10" />
        </div>
        <div v-else>Nothing found</div>
      </ul>
    </div>
    <p
      :data-test="error"
      v-show="error"
      class="pt-1 text-red-500 transition delay-500 text-sm"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import { useDetectOutsideClick } from "@/utils/outsideClick";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import { OptionItem } from "@/utils/types"
import SpinnerLoader from "@/components/SpinnerLoader.vue";

const props = defineProps<{
  label?: string;
  placeholder?: string;
  defaultValue?: OptionItem;
  modelValue: OptionItem;
  options: OptionItem[];
  error?: "";
  isValid?: boolean;
  isLoading: boolean
}>();

const optionsList = ref<HTMLUListElement | undefined>();
const emit = defineEmits(["update:modelValue"]);
const text = ref<string>(props.modelValue.label ?? "");
const select = ref<OptionItem | undefined>(props.defaultValue);
const options = computed(()=> props.options);
const shouldDisplayOptions = ref<boolean>(false);

const toggleShouldDisplayOptions = () =>
  (shouldDisplayOptions.value = !shouldDisplayOptions.value);
const handelSelect = (option: OptionItem) => {
  text.value = option.label;
  select.value = option;
  shouldDisplayOptions.value = false;
};

const filter = (keyWord: string): void => {
  options.value = props.options.filter(
    (option) => option.key.toLowerCase()?.search(keyWord) !== -1
  );
};
watch(select, (value) => {
  emit("update:modelValue", value);
});
watch(text, (value: string) => {
  if (value.length > 0) filter(value?.toLowerCase() ?? "");
  else options.value = props.options;
});

useDetectOutsideClick(optionsList, () => (shouldDisplayOptions.value = false));
</script>
