<template>
  <main class="flex w-full justify-center">
    <div :class="['p-8 max-w-screen-xl w-full block']">
      <div class="p-4 md:p-0">
        <TheBreadcrumb />
      </div>
      <div>
        <HolidayListfilter v-if="holidays.length" class="my-8" />
        <HolidaysDatagrid :isLoading="isLoading" :holidays="holidays" />
      </div>
      <div
        v-if="!holidays.length"
        class="pt-4 flex flex-col items-center justify-center"
      >
        <img src="@/assets/empty-holiday.svg" alt="sorry it is no holiday" />
        <p class="text-base">No holiday has been created</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import HolidaysDatagrid from "@/components/HolidaysDatagrid.vue";
import { Holiday } from "@/domain/Holiday";
import { useHolidayStore } from "@/store/holiday";
import HolidayListfilter from "../../components/HolidayListfilter.vue";

const holidayStore = useHolidayStore();

const holidays = ref<Holiday[]>([]);

const isLoading = ref<boolean>(false);

const fetchHolidays = async (): Promise<void> => {
  isLoading.value = true;
  holidays.value = await holidayStore.getAllHollidays();
  setTimeout(() => (isLoading.value = false), 500);
};

onMounted(() => {
  fetchHolidays();
});
</script>
