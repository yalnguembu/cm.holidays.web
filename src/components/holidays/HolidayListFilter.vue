<template>
  <div class="pb-8 border-b-2">
    <h2 class="text-3xl font-semibold mb-4 2xl:mb-8">Filter holiday requests</h2>
    <div class="w-full flex space-x-4 items-center justify-between rounded">
      <SelectInput
        v-model="filter.type"
        label="Type"
        :options="['Annual', 'Maternite']"
        class="flex items-center gap-x-2 2xl:gap-x-4"
        placeholder="Choose type"
      />
      <SelectInput
        v-model="filter.status"
        label="Status"
        :options="['Pending', 'Accepted', 'Rejected']"
        class="flex items-center gap-x-2 2xl:gap-x-4"
        placeholder="Choose status"
      />
      <DateInput
        v-model="filter.status"
        label="From"
        class="flex items-center gap-x-2 2xl:gap-x-4"
      />
      <DateInput v-model="filter.status" label="To" class="flex items-center gap-x-2 2xl:gap-x-4" />
      <button
        @click="reset"
        :disabled="!canReset"
        :class="['text-white shadow-none text-base p-2 px-4 rounded h-fit bg-gray-500/30 cursor-not-allowed ',{'bg-gray-500 cursor-pointer':canReset}]"
      >
        Reset
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive ,ref} from "vue";
import DateInput from "@/components/forms/DateInput.vue";
import { HOLIDAY_STATUS } from "@/utils/enum";
import SelectInput from "@/components/forms/SelectInput.vue";

const filter = reactive<{
  type: string;
  status: HOLIDAY_STATUS | string;
  from: string;
  to: string;
}>({
  type: "",
  status: "",
  from: "",
  to: "",
});

const canReset = ref<boolean>(!!filter.type || !!filter.from || !!filter.to || !!filter.status)
const reset = (): void => {};
</script>
