<template>
  <label for="email" class="text-gray-500">{{ label }}</label>
  <div
    :class="[
      'rounded-lg shadow-2xl shadow-gray-200 flex flex-row w-full justify-between align-center px-4 my-2  bg-gray md:bg-transparent',
      error ? 'border-2 border-red-500' : 'border border-gray-300',
    ]"
  >
    <LockIcon class="mt-4 w-6 h-6" />
    <input
      class="w-full p-4 bg-transparent outline-none"
      type="password"
      name="email"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
  <p
    class="text-red-600 mt-2 transition duration-500"
    v-if="error"
    data-test="password-input-text-error"
  >
    {{ error }}
  </p>
</template>
<script>
import LockIcon from "./icons/LockIcon.vue";

export default {
  name: "PasswordInput",

  components: {
    LockIcon,
  },
  props: {
    error: {
      type: String,
      require: true,
      default: "",
    },
    modelValue: {
      tyepe: String,
      require: true,
    },
    label: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: true,
      default: "",
    },
  },
};
</script>
