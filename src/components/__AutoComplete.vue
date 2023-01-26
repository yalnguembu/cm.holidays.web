<template>
  <div
    :class="[
      ['border', 'rounded-md', 'w-full', 'p-2 mt-2', 'bg-gray-100', 'relative'],
      isFocused && ['border-blue-500', 'border-2'],
    ]"
  >
    <input
      class="bg-transparent w-3/4 p-2 outline-none"
      type="text"
      :id="name"
      :name="name"
      :value="text"
      @input="handelText($event), filter()"
      @focus="toggleFocus()"
    />
    <ul
      class="bg-white shadow-lg rounded-lg absolute top-16 left-0 w-full"
      v-show="isFocused"
    >
      <li
        class="p-4 cursor-pointer hover:bg-gray-100"
        v-for="item in items"
        :key="item"
        @click="select(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Autocomplete",
  data() {
    return {
      text: this.placeholder,
      chooseen: "",
      isFocused: false,
      items: this.options,
    };
  },

  methods: {
    toggleFocus() {
      this.isFocused = !this.isFocused;
    },

    select(option) {
      this.text = option;
      this.chooseen = option;
      this.toggleFocus();
      this.$emit("modelValue:update", option);
    },

    handelText(event) {
      this.text = event.target.value;
    },

    filter() {},
  },

  computed: {
    filteredOptions: {
      get() {
        this.items.filter(Boolean);
      },

      set(value) {
        this.items = value;
      },
    },
  },

  props: {
    options: Array,
    name: String,
    placeholder: String,
  },
};
</script>
