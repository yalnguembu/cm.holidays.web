<template>
  <div>
    <label class="text-md text-gray-500"> {{ label }} </label>
    <div
      :class="[
        ' border rounded-md w-full p-2 mt-2  bg-gray-25 md:bg-transparent relative',
        { 'border-blue-500 border-2': focused },
        { 'border-red-500 border-2': error },
      ]"
      data-test="date-input-container"
    >
      <input
        type="text"
        :placeholder="placeholder"
        class="bg-transparent w-full p-2 outline-none"
        ref="dateInput"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="toggleFocus(), changeTypeToDate()"
        @blur="toggleFocus(), changeTypeToText()"
      />
      <span class="absolute top-4 right-4 pointer-events-none"
        ><AgendaIcon
      /></span>
    </div>
    <p class="text-red-500" v-if="error" data-test="date-input-text-error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import AgendaIcon from "./icons/AgendaIcon.vue";

export default {
  name: "DateInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      required: true,
    },

    error: {
      type: String,
      required: true,
      default: "",
    },
    
    readonly: Boolean,
  },

  components: {
    AgendaIcon,
  },

  data() {
    return {
      focused: false,
    };
  },

  methods: {
    toggleFocus() {
      this.focused = !this.focused;
    },

    changeTypeToText() {
      this.$refs.dateInput.type = "text";
    },

    changeTypeToDate() {
      this.$refs.dateInput.type = "date";
    },
  },
};
</script>
