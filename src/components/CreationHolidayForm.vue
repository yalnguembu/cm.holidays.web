<template>
  <section
    class="bg-gray-100 md:bg-stone-800/75 fixed inset-0 top-24 md:top-0 flex flex-row md:items-center justify-center overflow-y-auto"
  >
    <button class="w-full h-full block" @click="close" />
    <form
      data-test="creation-form"
      @submit.prevent="create"
      class="absolute t-12 p-4 md:w-3/4 lg:w-2/3 xl:w-1/2 md:border md:rounded-xl md:p-6 md:shadow-lg md:bg-white"
    >
      <div>
        <h2 class="text-3xl font-bold text-center" data-test="form-title">
          Create a holiday
        </h2>
        <div class="flex flex-row flex-wrap w-full my-4">
          <div
            class="basis-full md:basis-2/3 mb-4 md:p-2"
            data-test="holiday-type"
          >
            <SelectInput
              label="Type"
              placeholder="Choose your holiday's type..."
              :options="types"
              v-model="holidayType"
              :error="error.holidayType"
            />
          </div>
          <div
            class="basis-1/2 md:basis-1/3 pr-2 md:p-2"
            data-test="starting-date"
          >
            <DateInput
              placeholder="Date"
              label="Starting date"
              v-model="startingDate"
              :error="error.startingDate"
            />
          </div>
          <div
            class="basis-1/2 md:basis-1/3 pl-2 md:p-2"
            data-test="ending-date"
          >
            <DateInput
              placeholder="Date"
              label="Ending date"
              v-model="endingDate"
              :error="error.endingDate"
            />
          </div>
          <div
            class="basis-1/2 md:basis-1/3 pr-2 md:p-2"
            data-test="number-of-days"
          >
            <NumberInput
              label="Number of day"
              v-model="numbersOfdays"
              placeholder="Number of days"
            />
          </div>
          <div
            class="basis-1/2 md:basis-1/3 pl-2 md:p-2"
            data-test="returning-date"
          >
            <DateInput
              placeholder="Date"
              label="Returning date"
              :modelValue="returningDate"
              :error="''"
            />
          </div>
        </div>
        <div class="w-full md:p-2" data-test="description">
          <TextArea
            placeholder="Enter the description"
            label="Description"
            v-model="description"
            :error="error.description"
          />
        </div>
        <BaseButton
          type="submit"
          class="w-full mt-8 md:mt-3"
          title="SUBMIT"
          data-test="submit-button"
        />
      </div>
    </form>
  </section>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import DateInput from "./DateInput.vue";
import SelectInput from "./SelectInput.vue";
import TextArea from "./TextArea.vue";
import NumberInput from "./NumberInput.vue";

const timestampOfOneDay = 24 * 3600 * 1000;

export default {
  name: "CreationHolidayForm",

  components: {
    BaseButton,
    DateInput,
    SelectInput,
    TextArea,
    NumberInput,
  },

  emits: ["close"],

  data() {
    return {
      types: ["Annual", "Maternite", "Abscence", "christmas"],

      holidayType: "",

      startingDate: "",

      endingDate: "",

      description: "",

      error: {
        holidayType: "",
        startingDate: "",
        endingDate: "",
        description: "",
      },
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    checkholidayType() {
      if (this.holidayType === "") {
        this.error.holidayType = "This field is required";
      } else this.error.holidayType = "";
    },

    isStartingDateBeforeReturningDate() {
      return (
        new Date(this.startingDate).getTime() <
        new Date(this.endingDate).getTime()
      );
    },

    isStartingDateAfterToday() {
      return new Date().getTime() < new Date(this.startingDate).getTime();
    },

    checkStartingDate() {
      if (this.startingDate.length <= 0) {
        this.error.startingDate = "This field is required";
      } else if (!this.isStartingDateAfterToday()) {
        this.error.startingDate = "It must be after today";
      } else this.error.startingDate = "";
    },

    checkEndingDate() {
      if (!this.startingDate && !this.endingDate)
        this.error.endingDate = "This field is required";
      else if (!this.isStartingDateBeforeReturningDate())
        this.error.endingDate = "It must be after starting date";
      else if (this.endingDate.length > 0) this.error.endingDate = "";
      else this.error.endingDate = "";
    },

    checkDescription() {
      if (this.description.length <= 0) {
        this.error.description = "This field is required";
      } else this.error.description = "";
    },

    checkForm() {
      this.checkholidayType();
      this.checkStartingDate();
      this.checkEndingDate();
      this.checkDescription();
      return (
        (this.error.holidayType.length <= 0) &
        (this.error.startingDate.length <= 0) &
        (this.error.endingDate.length <= 0) &
        (this.error.description.length <= 0)
      );
    },

    getHolidays() {
      return JSON.parse(localStorage.getItem("holidays")) ?? [];
    },

    create() {
      if (this.checkForm()) {
        const holidays = this.getHolidays();
        const holiday = {
          id: holidays.length,
          holidayType: this.holidayType,
          startingDate: this.startingDate,
          endingDate: this.endingDate,
          returningDate: this.returningDate,
          description: this.description,
          createdAt: new Date().getTime(),
        };
        holidays.push(holiday);
        localStorage.setItem("holidays", JSON.stringify(holidays));
        this.close();
      }
    },
  },

  computed: {
    numbersOfdays() {
      const differenceOfStartingAndEndingDate =
        (this.endingDateTimestamp - this.startingDateTimestamp) /
        timestampOfOneDay;
      return differenceOfStartingAndEndingDate > 0
        ? differenceOfStartingAndEndingDate
        : "";
    },

    startingDateTimestamp() {
      return new Date(this.startingDate).getTime();
    },

    endingDateTimestamp() {
      return new Date(this.endingDate).getTime();
    },

    returningDay() {
      return new Date(this.endingDate).getDay();
    },

    returningDate() {
      let date;
      switch (this.endingDate.length > 0) {
        case false:
          return "";
        case this.returningDay === 6:
          date = new Date(this.endingDate).getTime() + timestampOfOneDay * 2;
          return new Date(date).toISOString().substring(0, 10);
        case this.returningDay === 0:
          date = new Date(this.endingDate).getTime() + timestampOfOneDay;
          return new Date(date).toISOString().substring(0, 10);
        default:
          return this.endingDate;
      }
    },
  },

  watch: {
    holidayType() {
      this.checkholidayType();
    },

    startingDate() {
      this.checkStartingDate();
      if (this.endingDate.length > 0) this.checkEndingDate();
    },

    endingDate() {
      this.checkStartingDate();
      this.checkEndingDate();
    },

    description() {
      this.checkDescription();
    },
  },
};
</script>
