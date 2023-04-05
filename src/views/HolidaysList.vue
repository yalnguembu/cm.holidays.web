<template>
  <main>
    <div
      :class="[
        'container p-2 md:px-16 lg:px-24',
        { 'overflow-hidden max-h-96': isFormVisible },
      ]"
      v-if="isHolidays"
    >
      <div class="flex flex-row justify-between items-center p-4">
        <TheBreadcrumb />
        <NewHolidayButton @click="toggleFormModal" />
      </div>
      <div class="gap-y-12 flex flex-row flex-wrap mt-4 md:mt-8">
        <RouterLink
          class="px-4 md:basis-1/2 lg:basis-1/3"
          v-for="holiday in state.holidays"
          :key="holiday.id"
          :to="`/list/${holiday.id}`"
        >
          <HolidayItem :holiday="holiday" />
        </RouterLink>
      </div>
    </div>
    <div v-else class="pt-12 flex flex-col items-center justify-center">
      <img src="../assets/empty-holiday.svg" alt="sorry it is no holiday" />
      <p class="text-base">No holiday has been created</p>
      <BaseButton
        title="Create holiday"
        class="mt-4 text-base py-2"
        @click="toggleFormModal"
      />
    </div>
    <CreationHolidayForm v-if="isFormVisible" @close="toggleFormModal" />
  </main>
</template>

<script setup lang="ts">
import TheBreadcrumb from "../components/TheBreadcrumb.vue";
import BaseButton from "../components/BaseButton.vue";
import HolidayItem from "../components/HolidayItem.vue";
import NewHolidayButton from "../components/CreationHolidayButton.vue";
import CreationHolidayForm from "../components/CreationHolidayForm.vue";

import { computed, onMounted, reactive, toRef, watch } from "@vue/runtime-core";
import { ref } from "vue";
const emit = defineEmits(["close"]);

type Holiday = {
  holidayType: string;
  id: number;
  startingDate: string;
  returningDate: string;
  endingDate: string;
  description: string;
  createdAt: number;
};

const isFormVisible = ref(false);
const state = reactive<{ holidays: Holiday[] }>({
  holidays: [],
});


const isHolidays = computed(() => {
  return state.holidays.length > 0;
});

const getHolidays = () => {
  return JSON.parse(localStorage.getItem("holidays") ?? "") ?? [];
};

const toggleFormModal = () => {
  isFormVisible.value = !isFormVisible.value;
};

watch(isFormVisible, (value) => {
  !value ? (state.holidays = getHolidays()) : "";
});

onMounted(() => {
  state.holidays = getHolidays();
});

</script>
