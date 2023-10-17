<template>
  <div data-test="holiday-edit">
    <div>
      <h2 class="text-3xl font-bold" data-test="form-title">Edit</h2>
    </div>
    <form @submit.prevent="save" @reset.prevent="emits('canceled')">
      <div class="grid md:grid-cols-3 gap-4 w-full my-4">
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
      </div>
      <div class="flex justify-end">
        <BaseButton
          type="reset"
          title="Cancel"
          class="text-base shadow-none text-black font-normal bg-gray-200"
        />
        <BaseButton
          title="Save"
          :class="[
            'ml-4 shadow-none text-base',
            { 'cursor-not-allowed opacity-20': isHolidayNotEdited },
          ]"
        />
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import DateInput from "@/components/forms/DateInput.vue";
import TextArea from "@/components/forms/TextArea.vue";
import NumberInput from "@/components/forms/NumberInput.vue";
import { watch, computed, reactive, toRef, PropType, ref } from "vue";
import AutoComplete from "@/components/forms/AutoComplete.vue";
import BaseButton from "../BaseButton.vue";
import type { HolidayRequest } from "@/domain/HolidayRequest";
import { soutractTwoDates } from "@/utils/date";

const props = defineProps({
  holiday: {
    type: Object as PropType<HolidayRequest>,
  },
});
const emits = defineEmits<{
  (event: "canceled"): void;
  (event: "edited"): void;
}>();

const timestampOfOneDay: number = 24 * 3600 * 1000;
const types: string[] = ["Annual", "Maternite", "Abscence", "christmas"];

const editHoliday = reactive({
  id: props.holiday.id,
  description: props.holiday.description,
  startingDate: props.holiday.startingDate,
  endingDate: props.holiday.endingDate,
  createdAt: props.holiday.endingDate,
  holidayType: props.holiday.holidayType,
  status: props.holiday.status,
});

interface HolidayErrors {
  holidayType: string;
  startingDate: string;
  endingDate: string;
  description: string;
}

const error = reactive<HolidayErrors>({
  holidayType: "",
  startingDate: "",
  endingDate: "",
  description: "",
});

const numbersOfdays = computed((): number | string =>
  soutractTwoDates(
    endingDateTimestamp.value,
    startingDateTimestamp.value
  )
);
const startingDateTimestamp = computed((): number => {
  return new Date(editHoliday.startingDate).getTime();
});
const endingDateTimestamp = computed((): number => {
  return new Date(editHoliday.endingDate).getTime();
});
const returningDay = computed((): number => {
  return new Date(editHoliday.endingDate).getDay();
});
const returningDate = computed((): string => {
  let date: number;
  switch (editHoliday.endingDate.length > 0) {
    case false:
      return "";
    case returningDay.value === 6:
      date = new Date(editHoliday.endingDate).getTime() + timestampOfOneDay * 2;
      return new Date(date).toISOString().substring(0, 10);
    case returningDay.value === 0:
      date = new Date(editHoliday.endingDate).getTime() + timestampOfOneDay;
      return new Date(date).toISOString().substring(0, 10);
    default:
      return editHoliday.endingDate;
  }
});

const checkholidayType = (): void => {
  if (editHoliday.holidayType === "") {
    error.holidayType = "This field is required";
  } else error.holidayType = "";
};

const checkStartingDate = (): void => {
  if (editHoliday.startingDate.length <= 0) {
    error.startingDate = "This field is required";
  } else if (!isStartingDateAfterToday()) {
    error.startingDate = "It must be after today";
  } else error.startingDate = "";
};
const checkEndingDate = (): void => {
  if (!editHoliday.startingDate && !editHoliday.endingDate)
    error.endingDate = "This field is required";
  else if (!isStartingDateBeforeReturningDate())
    error.endingDate = "It must be after starting date";
  else if (editHoliday.endingDate.length > 0) error.endingDate = "";
  else error.endingDate = "";
};
const checkDescription = (): void => {
  if (editHoliday.description.length <= 0) {
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

const isHolidayNotEdited = ref<boolean>(
  JSON.stringify(props.holiday) !== JSON.stringify(editHoliday)
);

const save = (): void => {
  // if (checkForm()) {
  //   const newHoliday: HolidayRequest = {
  //     id: holidays.length,
  //     holidayType: holidays.holidayType,
  //     startingDate: holidays.startingDate,
  //     endingDate: holidays.endingDate,
  //     returningDate: returningDate.value,
  //     description: holidays.description,
  //     createdAt: new Date().getTime(),
  //   };
  //   close();
  // }
  console.log(editHoliday);
};
watch(toRef(editHoliday, "holidayType"), (value) => {
  checkholidayType();
  console.log(value);
});
watch(toRef(editHoliday, "startingDate"), () => {
  checkStartingDate();
  if (editHoliday.endingDate.length > 0) checkEndingDate();
});
watch(toRef(editHoliday, "endingDate"), () => {
  checkStartingDate();
  checkEndingDate();
});
watch(toRef(editHoliday, "description"), () => {
  checkDescription();
});
</script>
