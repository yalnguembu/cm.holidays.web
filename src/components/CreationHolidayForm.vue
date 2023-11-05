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
        <div class="grid md:grid-cols-3 gap-4 w-full mt-4">
          <div class="md:col-span-2" data-test="holiday-type">
            <AutoComplete
              label="Type"
              placeholder="Choose your holiday's type..."
              :options="types"
              v-model="holiday.holidayType"
              :error="error.holidayType"
            />
          </div>
          <div class="basis-1/2 md:basis-1/3" data-test="starting-date">
            <DateInput
              placeholder="Date"
              label="Starting date"
              v-model="holiday.startingDate"
              :error="error.startingDate"
            />
          </div>
          <div class="basis-1/2 md:basis-1/3" data-test="ending-date">
            <DateInput
              placeholder="Date"
              label="Ending date"
              v-model="holiday.endingDate"
              :error="error.endingDate"
            />
          </div>
          <div class="basis-1/2 md:basis-1/3" data-test="number-of-days">
            <NumberInput
              label="Number of day"
              v-model="numbersOfdays"
              placeholder="Number of days"
            />
          </div>
          <div class="" data-test="returning-date">
            <DateInput
              placeholder="Date"
              label="Returning date"
              :modelValue="returningDate"
              :error="''"
            />
          </div>
          <div data-test="description" class="md:col-span-3">
            <TextArea
              placeholder="Enter the description"
              label="Description"
              v-model="holiday.description"
              :error="error.description"
            />
          </div>
          <div class="md:col-span-3 md:flex md:justify-center">
            <BaseButton
              title="Continue"
              data-test="submit-button"
              class="w-full shadow-none text-base md:w-1/2 mt-4 hover:shadow-md hover:shadow-blue-primary"
            />
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import DateInput from "./form/DateInput.vue";
import TextArea from "./form/TextArea.vue";
import NumberInput from "./form/NumberInput.vue";
import { watch, computed, reactive, toRef } from "vue";
import AutoComplete from "./form/AutoComplete.vue";
import { soutractTwoDates, setDateToWorkingDay } from "@/utils/date";
import type { HolidayErrors } from "@/utils/type";
import { Holiday } from "@/domain/Holiday";
import { useHolidayStore } from "../store/holiday";
import { useRouter } from "vue-router";

const holidayStore = useHolidayStore();
const router = useRouter();

const emit = defineEmits(["close"]);

const types: string[] = ["Annual", "Maternite", "Abscence", "christmas"];

const holiday = reactive({
  holidayType: "",
  startingDate: "",
  endingDate: "",
  description: "",
});

const error = reactive<HolidayErrors>({
  holidayType: "",
  startingDate: "",
  endingDate: "",
  description: "",
});

const numbersOfdays = computed((): number | string =>
  soutractTwoDates(holiday.endingDate, holiday.startingDate)
);
const returningDate = computed((): string =>
  setDateToWorkingDay(holiday.endingDate)
);

const close = (): void => {
  emit("close");
};
const checkholidayType = (): void => {
  if (holiday.holidayType === "") {
    error.holidayType = "This field is required";
  } else error.holidayType = "";
};
const isStartingDateBeforeReturningDate = (): boolean => {
  return (
    new Date(holiday.startingDate).getTime() <
    new Date(holiday.endingDate).getTime()
  );
};
const isStartingDateAfterToday = (): boolean => {
  return new Date().getTime() < new Date(holiday.startingDate).getTime();
};
const checkStartingDate = (): void => {
  if (holiday.startingDate.length <= 0) {
    error.startingDate = "This field is required";
  } else if (!isStartingDateAfterToday()) {
    error.startingDate = "It must be after today";
  } else error.startingDate = "";
};
const checkEndingDate = (): void => {
  if (!holiday.startingDate && !holiday.endingDate)
    error.endingDate = "This field is required";
  else if (!isStartingDateBeforeReturningDate())
    error.endingDate = "It must be after starting date";
  else if (holiday.endingDate.length > 0) error.endingDate = "";
  else error.endingDate = "";
};
const checkDescription = (): void => {
  if (holiday.description.length <= 0) {
    error.description = "This field is required";
  } else error.description = "";
};
const checkForm = (): Boolean => {
  checkholidayType();
  checkStartingDate();
  checkEndingDate();
  checkDescription();
  return (
    error.holidayType.length <= 0 &&
    error.startingDate.length <= 0 &&
    error.endingDate.length <= 0 &&
    error.description.length <= 0
  );
};

const create = async (): void => {
  if (checkForm()) {
    const newHoliday: Holiday = new Holiday(holiday);
    const newHolidayId = await holidayStore.createHoliday(newHoliday);
    router.push(`/list/${newHolidayId}`);
  }
};

watch(toRef(holiday, "holidayType"), (value) => {
  checkholidayType();
  console.log(value);
});
watch(toRef(holiday, "startingDate"), () => {
  checkStartingDate();
  if (holiday.endingDate.length > 0) checkEndingDate();
});
watch(toRef(holiday, "endingDate"), () => {
  checkStartingDate();
  checkEndingDate();
});
watch(toRef(holiday, "description"), () => {
  checkDescription();
});
</script>
