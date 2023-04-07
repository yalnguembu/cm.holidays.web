<template>
  <div
    data-test="holiday-item"
    class="border rounded-xl p-4 shadow-[1px_35px_5px_-19px_#D1E4FA] bg-white h-full"
  >
    <div class="flex flew-row items-center justify-between">
      <p class="text-gray-500 text-sm" data-test="created-at">
        {{ createdAt }}
      </p>
      <p class="text-gray-500 text-sm" data-test="creation-time">
        {{ creationTime }}
      </p>
    </div>
    <p class="text-blue-600 font-bold text-xl my-4" data-test="date-range">
      {{ dateRange }}
    </p>
    <p class="text-gray-500 my-4" data-test="description">
      {{ holiday.description }}
    </p>
    <p
      class="text-blue-500 inline rounded-xl bg-blue-100 p-1 px-4 block"
      data-test="type"
    >
      {{ holiday.holidayType }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";

const timestampOfOneDay = 24 * 3600 * 1000;

const props = defineProps<{
  holiday: {
    id: number;
    description: string;
    startingDate: string;
    endingDate: string;
    createdAt: number;
    holidayType: string;
  };
}>();

const formateToDateString = (date: string) => {
  return new Date(date).toDateString();
};
const isHolidayCreatedToday = () => {
  return createdAtDay() < 1;
};
const createdAtDay = () => {
  return (new Date().getTime() - props.holiday.createdAt) / timestampOfOneDay;
};
const createdAtHour = () => {
  const timetsamp = createdAtDay() * 24;
  return timetsamp >= 1
    ? `il y'a ${timetsamp.toFixed(0)} heures`
    : timetsamp * 60 > 0
    ? `il y'a ${(timetsamp * 60).toFixed(0)} minutes`
    : "A l'instant";
};
const formatCreatedAt = () => {
  return isHolidayCreatedToday()
    ? createdAtHour()
    : `il y'a ${createdAtDay().toFixed(0)} jours`;
};
const dateRange = computed(() => {
  return `${formateToDateString(
    props.holiday.startingDate
  )} - ${formateToDateString(props.holiday.endingDate)}
        `;
});
const creationTime = computed(() => {
  return new Date(props.holiday.createdAt).toLocaleTimeString().substring(0, 5);
});
const createdAt = computed(() => {
  return formatCreatedAt();
});
</script>
