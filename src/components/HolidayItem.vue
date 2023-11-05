<template>
  <div
    class="border rounded-xl p-4 shadow-[1px_35px_5px_-19px_#D1E4FA] bg-white h-full"
  >
    <div class="flex flew-row items-center justify-between">
      <p class="text-gray-500 text-sm" data-test="created-at">
        {{ timetampsToString(createdAt) }}
      </p>
      <HolidayStatus :value="holiday.status ?? 'DRAFT'" class="text-base" />
    </div>
    <p class="text-blue-600 font-bold text-xl my-4" data-test="data-range">
      {{ dateRange }}
    </p>
    <p class="text-gray-700 inline font-semibold text-lg underline decoration-wavy decoration-blue-primary/40" data-test="type">
      {{ holiday.holidayType }}
    </p>
    <p class="text-gray-500 my-4" data-test="description">
      {{ holiday.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { formateToDateString } from "@/utils/string";
import { timetampsToString } from "@/utils/common";
import HolidayStatus from "./HolidayStatus.vue";
import { Holiday } from "../domain/Holiday";

const timestampOfOneDay: number = 24 * 3600 * 1000;

const props = defineProps({
  holiday: {
    type: Object as PropType<Holiday>,
    required: true,
  },
});

const isHolidayCreatedToday = (): boolean => {
  return createdAtDay() < 1;
};
const createdAtDay = (): number => {
  return (new Date().getTime() - props.holiday.createdAt) / timestampOfOneDay;
};
const createdAtHour = () => {
  const timetsamp: number = createdAtDay() * 24;
  return timetsamp >= 1
    ? `il y'a ${timetsamp.toFixed(0)} heures`
    : timetsamp * 60 > 0
    ? `il y'a ${(timetsamp * 60).toFixed(0)} minutes`
    : "A l'instant";
};

const dateRange = computed((): string => {
  return `${formateToDateString(
    props.holiday.startingDate
  )} - ${formateToDateString(props.holiday.endingDate)}
        `;
});
const createdAt = computed((): string => {
  return isHolidayCreatedToday()
    ? createdAtHour()
    : `il y'a ${createdAtDay().toFixed(0)} jours`;
});
</script>
