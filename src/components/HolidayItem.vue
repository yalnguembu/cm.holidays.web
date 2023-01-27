<template>
  <div
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
    <p class="text-blue-600 font-bold text-xl my-4" data-test="data-range">
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

<script setup>
import { computed } from "@vue/runtime-core";

const timestampOfOneDay = 24 * 3600 * 1000;

const props = defineProps({
  holiday: {
    id: {
      type: Number,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    startingDate: {
      type: Date,
      require: true,
    },

    endingDate: {
      type: Date,
      require: true,
    },

    createdAt: {
      type: Number,
      require: true,
    },

    holidayType: {
      type: String,
      require: true,
    },
  },
});

const formateToDateString = (date) => {
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
    ? `il y'a ${parseInt(timetsamp)} heures`
    : parseInt(timetsamp * 60) > 0
    ? `il y'a ${parseInt(timetsamp * 60)} minutes`
    : "A l'instant";
};
const formatCreatedAt = () => {
  return isHolidayCreatedToday()
    ? createdAtHour()
    : `il y'a ${parseInt(createdAtDay())} jours`;
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
