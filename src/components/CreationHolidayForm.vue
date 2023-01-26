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
              defaultOption="Choose your holiday's type..."
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
import { watch, computed, reactive, ref } from "@vue/runtime-core";

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
  
  setup(props, { emit }) {
    const types = ["Annual", "Maternite", "Abscence", "christmas"];
    const holidayType = ref("");
    const startingDate = ref("");
    const endingDate = ref("");
    const description = ref("");
    const error = reactive({
      holidayType: "",
      startingDate: "",
      endingDate: "",
      description: "",
    });
    const close = () => {
      emit("close");
    };
    const checkholidayType = () => {
      if (holidayType.value === "") {
        error.holidayType = "This field is required";
      } else error.holidayType = "";
    };
    const isStartingDateBeforeReturningDate = () => {
      return (
        new Date(startingDate.value).getTime() <
        new Date(endingDate.value).getTime()
      );
    };
    const isStartingDateAfterToday = () => {
      return new Date().getTime() < new Date(startingDate.value).getTime();
    };
    const checkStartingDate = () => {
      if (startingDate.value.length <= 0) {
        error.startingDate = "This field is required";
      } else if (!isStartingDateAfterToday()) {
        error.startingDate = "It must be after today";
      } else error.startingDate = "";
    };
    const checkEndingDate = () => {
      if (!startingDate.value && !endingDate.value)
        error.endingDate = "This field is required";
      else if (!isStartingDateBeforeReturningDate())
        error.endingDate = "It must be after starting date";
      else if (endingDate.value.length > 0) error.endingDate = "";
      else error.endingDate = "";
    };
    const checkDescription = () => {
      if (description.value.length <= 0) {
        error.description = "This field is required";
      } else error.description = "";
    };
    const checkForm = () => {
      checkholidayType();
      checkStartingDate();
      checkEndingDate();
      checkDescription();
      return (
        (error.holidayType.length <= 0) &
        (error.startingDate.length <= 0) &
        (error.endingDate.length <= 0) &
        (error.description.length <= 0)
      );
    };
    const getHolidays = () => {
      return JSON.parse(localStorage.getItem("holidays")) ?? [];
    };
    const create = () => {
      if (checkForm()) {
        const holidays = getHolidays();
        const holiday = {
          id: holidays.length,
          holidayType: holidayType.value,
          startingDate: startingDate.value,
          endingDate: endingDate.value,
          returningDate: returningDate.value,
          description: description.value,
          createdAt: new Date().getTime(),
        };
        holidays.push(holiday);
        localStorage.setItem("holidays", JSON.stringify(holidays));
        this.close();
      }
    };
    const numbersOfdays = computed(() => {
      const differenceOfStartingAndEndingDate =
        (endingDateTimestamp.value - startingDateTimestamp.value) /
        timestampOfOneDay;
      return differenceOfStartingAndEndingDate > 0
        ? differenceOfStartingAndEndingDate
        : "";
    });
    const startingDateTimestamp = computed(() => {
      return new Date(startingDate.value).getTime();
    });
    const endingDateTimestamp = computed(() => {
      return new Date(endingDate.value).getTime();
    });
    const returningDay = computed(() => {
      return new Date(endingDate.value).getDay();
    });
    const returningDate = computed(() => {
      let date;
      switch (endingDate.value.length > 0) {
        case false:
          return "";
        case returningDay.value === 6:
          date = new Date(endingDate.value).getTime() + timestampOfOneDay * 2;
          return new Date(date).toISOString().substring(0, 10);
        case returningDay.value === 0:
          date = new Date(endingDate.value).getTime() + timestampOfOneDay;
          return new Date(date).toISOString().substring(0, 10);
        default:
          return endingDate.value;
      }
    });
    watch(startingDate, () => {
      checkStartingDate();
      if (endingDate.value.length > 0) checkEndingDate();
    });
    watch(endingDate, () => {
      checkStartingDate();
      checkEndingDate();
    });
    watch(description, () => {
      checkDescription();
    });
    return {
      numbersOfdays,
      startingDateTimestamp,
      endingDateTimestamp,
      returningDay,
      returningDate,
      types,
      holidayType,
      startingDate,
      endingDate,
      description,
      error,
      close,
      create,
    };
  },
};
</script>
