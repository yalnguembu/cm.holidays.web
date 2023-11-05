<template>
  <div class="pb-8 border-b-2">
    <h2 class="text-3xl font-semibold mb-4">Filter requests list</h2>
    <div class="w-full flex space-x-4 items-center justify-between">
      <AutoComplete
        v-model="filter.type"
        label="Type"
        :options="['Annual', 'Maternite']"
        class="flex items-center"
        placeholder="Choose type"
      />
      <AutoComplete
        v-model="filter.status"
        label="Status"
        :options="['Pending', 'Accepted', 'Rejected']"
        class="flex items-center"
        placeholder="Choose status"
      />
      <DateInput
        v-model="filter.status"
        label="From"
        class="flex items-center"
      />
      <DateInput v-model="filter.status" label="To" class="flex items-center" />
      <button
        @click="reset"
        class="bg-gray-500 text-white shadow-none text-base p-2 px-4 rounded h-fit"
      >
        Reset
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import AutoComplete from "./form/AutoComplete.vue";
import DateInput from "./form/DateInput.vue";
import { HOLIDAY_STATUS } from "@/utils/enum";

const filter = reactive<{
  type: string;
  status: HOLIDAY_STATUS;
  from: string;
  to: string;
}>({
  type: "",
  status: "",
  from: "",
  to: "",
});

const reset = (): void => {};
</script>
