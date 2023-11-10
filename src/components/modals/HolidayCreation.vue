<template>
  <ModalWrapper @close="$emit('close')">
    <div
      class="p-4 md:w-[75vw] md:border md:rounded-xl md:p-6 md:shadow-lg md:bg-white lg:w-[66vw] xl:w-[50vw] 2xl:w-[30vw]"
    >
      <form data-test="creation-form" @submit.prevent="create">
        <h2
          class="text-3xl text-blue-900 font-bold text-center"
          data-test="form-title"
        >
          New holiday request
        </h2>
        <div class="grid gap-4 w-full mt-3">
          <SelectInput
            data-test="holiday-type"
            label="Type"
            placeholder="Choose your holiday's type..."
            :options="holidayTypes"
            :is-loading="isHolidayTypeLoading"
            v-model="holiday.type"
            :error="error.type"
          />
          <div class="grid grid-cols-2 gap-x-4">
            <DateInput
              data-test="starting-date"
              placeholder="Date"
              label="Starting date"
              v-model="holiday.startingDate"
              :error="error.startingDate"
            />
            <DateInput
              data-test="ending-date"
              placeholder="Date"
              label="Ending date"
              v-model="holiday.endingDate"
              :error="error.endingDate"
            />
          </div>
          <div class="grid grid-cols-2 gap-x-4">
            <NumberInput
              data-test="number-of-days"
              label="Number of day"
              v-model="numbersOfDays"
              readonly
              placeholder="Number of days"
            />
            <DateInput
              data-test="returning-date"
              placeholder="Date"
              readonly
              label="Returning date"
              :modelValue="returningDate"
              :error="''"
            />
          </div>
          <TextArea
            data-test="description"
            placeholder="Enter the description"
            label="Description"
            v-model="holiday.description"
            :error="error.description"
          />
          <div class="grid md:grid-cols-2 gap-x-6">
            <BaseButton
              @click="$emit('close')"
              title="cancel"
              data-test="submit-button"
              class="w-full shadow-none text-base mt-4 hover:shadow-md bg-gray-200 font-semibold text-gray-700 md:mt-0"
            />
            <BaseButton
              :title="isLoading ? 'Creating...' : 'Create'"
              data-test="submit-button"
              class="w-full bg-blue-primary text-white shadow-none text-base mt-4 hover:shadow-md hover:shadow-blue-primary font-semibold md:mt-0"
            />
          </div>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import DateInput from "@/components/forms/DateInput.vue";
import TextArea from "@/components/forms/TextArea.vue";
import NumberInput from "@/components/forms/NumberInput.vue";
import { watch, computed, reactive, toRef, ref, onBeforeMount } from "vue";
import {
  soutractTwoDates as subtractTwoDates,
  setDateToWorkingDay,
} from "@/utils/date";
import { HolidayErrors } from "@/utils/type";
import { HolidayRequest } from "@/domain/HolidayRequest";
import { useHolidayRequestStore } from "../../store/holidayRequest";
import { useRouter } from "vue-router";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import SelectInput from "@/components/forms/SelectInput.vue";
import { HolidayTypeOption } from "@/utils/options";
import { useHolidayTypeStore } from "@/store/holidayType";
import { RequestsStatus } from "@/utils/api";
import { newNullHolidayType, HolidayType } from "@/domain/HolidayType";

const holidayStore = useHolidayRequestStore();
const router = useRouter();

const emit = defineEmits(["close", "created"]);

const holidayTypes = ref<HolidayTypeOption[]>([]);

const holiday = reactive({
  type: newNullHolidayType(),
  startingDate: new Date().toUTCString(),
  endingDate: "",
  description: "",
});

const error = reactive<HolidayErrors>({
  type: "",
  startingDate: "",
  endingDate: "",
  description: "",
});

const numbersOfDays = computed((): number | string =>
  subtractTwoDates(
    holiday.endingDate ?? new Date().toUTCString(),
    holiday.startingDate
  )
);
const returningDate = computed((): string =>
  setDateToWorkingDay(holiday.endingDate)
);

const isHolidayTypeLoading = ref<boolean>();

const fetchHolidaysType = async () => {
  isHolidayTypeLoading.value = true;
  const apiResponse = await useHolidayTypeStore().getAllHolidayTypes();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    holidayTypes.value = (apiResponse.data ?? [])?.map(
      (type) => new HolidayTypeOption(type)
    );
  isHolidayTypeLoading.value = false;
};

onBeforeMount(() => {
  fetchHolidaysType();
});

const checkHolidayType = (): void => {
  if (holiday.type.isNull) {
    error.type = "This field is required";
  } else error.type = "";
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
  checkHolidayType();
  checkStartingDate();
  checkEndingDate();
  checkDescription();
  return (
    error.type.length <= 0 &&
    error.startingDate.length <= 0 &&
    error.endingDate.length <= 0 &&
    error.description.length <= 0
  );
};

const isLoading = ref<boolean>(false);

const create = async (): Promise<void> => {
  isLoading.value = true;
  if (checkForm()) {
    const newHoliday: HolidayRequest = new HolidayRequest({
      type: holiday.type.holidayTypeAsDTO,
      description: holiday.description,
      startingDate: holiday.startingDate,
      endingDate: holiday.endingDate,
      returningDate: returningDate.value,
    });
    const holidayRequestCreationResponse =
      await holidayStore.createHolidayRequest(newHoliday);
    if (holidayRequestCreationResponse.status === RequestsStatus.SUCCESS)
      emit("created");
  }
  isLoading.value = false;
};

watch(toRef(holiday, "type"), (value) => {
  checkHolidayType();
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
