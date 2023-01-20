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

<script>
const timestampOfOneDay = 24 * 3600 * 1000;
export default {
  name: "Holiday",

  props: {
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
  },

  methods: {
    formateToDateString(date) {
      return new Date(date).toDateString();
    },

    isHolidayCreatedToday() {
      return this.createdAtDay() < 1;
    },

    createdAtDay() {
      return (
        (new Date().getTime() - this.holiday.createdAt) / timestampOfOneDay
      );
    },

    createdAtHour() {
      const timetsamp = this.createdAtDay() * 24;
      return timetsamp >= 1
        ? `il y'a ${parseInt(timetsamp)} heures`
        : parseInt(timetsamp * 60) > 0
        ? `il y'a ${parseInt(timetsamp * 60)} minutes`
        : "A l'instant";
    },

    formatCreatedAt() {
      return this.isHolidayCreatedToday()
        ? this.createdAtHour()
        : `il y'a ${parseInt(this.createdAtDay())} jours`;
    },
  },

  computed: {
    dateRange() {
      return `${this.formateToDateString(
        this.holiday.startingDate
      )} - ${this.formateToDateString(this.holiday.endingDate)}
        `;
    },

    creationTime() {
      return new Date(this.holiday.createdAt)
        .toLocaleTimeString()
        .substring(0, 5);
    },

    createdAt() {
      return this.formatCreatedAt();
    },
  },
};
</script>
