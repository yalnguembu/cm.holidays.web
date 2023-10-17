<template>
  <ModalWrapper @close="$emit('close')">
    <div
      class="flex flex-col items-center justify-center t-0 p-4 md:w-[75vw] md:border md:rounded-xl md:p-6 md:shadow-lg md:bg-white xl:w-[50vw] 2xl:w-[33vw] lg:min-h-[300px]"
    >
      <EditionHolidayForm
        :holiday="holiday"
        v-if="shouldEditHoliday"
        @canceled="toggleEditionFormVisibility"
        @edited="fetchHoliday"
      />
      <HolidayDelete
        @close="toggleShouldDeleteHoliday"
        @deleted="toggleShouldDeleteHoliday"
        v-else-if="shouldDeleteHoliday"
        :isLoading="isLoading"
      />
      <div v-else-if="isRequesting">
        <div
          class="w-20 h-20 rounded-full border-8 border-gray-100 dark:border-gray-400 relative animate-spin"
        >
          <div
            class="w-4 h-4 absolute -top-1 left-0 rounded-full bg-blue-500"
          />
        </div>
        <p class="text-gray-500 text-lg mt-4">Requesting</p>
      </div>
      <div
        class="items-center flex flex-col w-full h-full justify-center justify-center"
        v-else-if="isRequested"
      >
        <CheckCircleIcon
          class="w-[8rem] h-[8rem] stroke-green-500 block inline"
        />
        <p class="text-gray-500 text-lg mt-4">
          HolidayRequest requested successfully
        </p>
      </div>
      <div class="w-full" v-else>
        <HolidayDetailsSkelton v-if="isLoading" />
        <template v-else>
          <div class="flex justify-between mb-4">
            <h2 class="text-3xl font-bold" data-test="form-title">Details</h2>
            <div>
              <template
                v-if="holiday.status === HOLIDAY_STATUS.DRAFT && isEmployee"
              >
                <button
                  class="p-2 h-fit border-2 border-transparent font-bold text-gray-500 transition hover:shadow duration-500 hover:border-blue-primary hover:text-blue-primary rounded"
                  @click="toggleEditionFormVisibility"
                >
                  <EditIcon />
                </button>
                <button
                  class="p-2 h-fit border-2 border-transparent mx-2 font-bold text-gray-500 transition hover:shadow duration-500 hover:border-red-600 hover:text-red-600 rounded"
                  @click="toggleShouldDeleteHoliday"
                >
                  <TrashIcon />
                </button>
                <BaseButton
                  title="Submit"
                  class="ml-4 shadow-none text-base hover:shadow-md hover:shadow-blue-primary/50"
                  @click="publish"
                />
              </template>
              <template
                v-else-if="
                  holiday.status === HOLIDAY_STATUS.PENDING && isHumanResource
                "
              >
                <button
                  class="p-2 px-4 h-fit font-bold text-gray-500 transition hover:shadow duration-500 hover:bg-blue-primary text-blue-primary hover:text-white rounded"
                >
                  Approve
                </button>
                <button
                  class="p-2 px-4 h-fit ml-4 font-bold text-gray-500 transition hover:shadow duration-500 hover:bg-red-600 text-red-600 hover:text-white rounded"
                  @click="toggleShouldDeleteHoliday"
                >
                  Reject
                </button>
              </template>
              <HolidayStatus :value="holiday.status" v-else />
            </div>
          </div>
          <div data-test="holiday-details" class="">
            <p class="text-gray-500 text-sm" data-test="created-at my-2">
              {{
                `Holiday created ${timetampsToString(holiday.createdAt)} ago`
              }}
            </p>
            <p
              class="text-blue-primary font-bold text-2xl my-2"
              data-test="data-range"
            >
              {{ dateRange }}
            </p>
            <p class="text-lg mb-2 text-gray-800">
              {{
                `  ${soutractTwoDates(
                  holiday.endingDate,
                  holiday.startingDate
                )} Jour${
                  soutractTwoDates(holiday.endingDate, holiday.startingDate) > 1
                    ? "s"
                    : " "
                } de conges`
              }}
            </p>
            <p
              class="text-blue-primary font-bold bg-blue-100 px-3 rounded-full inline-block mt-2"
              data-test="type"
            >
              {{ holiday.holidayType }}
            </p>
            <p class="text-gray-500 my-4 text-lg" data-test="description">
              {{ holiday.description }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import BaseButton from "../BaseButton.vue";
import EditionHolidayForm from "@/components/holidays/EditionHolidayRequest.vue";
import {
  type HolidayRequest,
  newNullHolidayRequest,
} from "@/domain/HolidayRequest";
import { useHolidayRequestStore } from "@/store/holidayRequest";
import { HOLIDAY_STATUS } from "@/utils/enum";
import { formateToDateString } from "@/utils/string";
import { timetampsToString } from "@/utils/common";
import { soutractTwoDates } from "@/utils/date";
import EditIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import HolidayDetailsSkelton from "@/components/holidays/HolidayDetailsSkelton.vue";
import HolidayDelete from "@/components/holidays/DeleteHolidayBox.vue";
import HolidayStatus from "@/components/StatusBage.vue";
import { useRoute, useRouter } from "vue-router";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";

const props = defineProps({
  holidayId: {
    type: String,
    required: true,
  },
});

const holiday = ref<HolidayRequest>(newNullHolidayRequest());
const router = useRouter();

const emits = defineEmits<{
  (event: "close"): void;
}>();
const close = (): void => {
  emits("close");
};

const isEmployee: boolean =
  useRoute().meta?.requiredRolesList.includes("EMPLOYEE");
const isHumanResource: boolean =
  useRoute().meta?.requiredRolesList.includes("HUMAN_RESOURCE");

const fetchHoliday = async () => {
  isLoading.value = true;
  holiday.value = await useHolidayRequestStore().getHolidayById(
    props.holidayId
  );
  setTimeout(() => (isLoading.value = false), 500);
};

onBeforeMount(() => {
  fetchHoliday();
});

const isLoading = ref<boolean>(false);
const isRequesting = ref<boolean>(false);
const isRequested = ref<boolean>(false);

const shouldEditHoliday = ref<boolean>(false);
const toggleEditionFormVisibility = () =>
  (shouldEditHoliday.value = !shouldEditHoliday.value);

const shouldDeleteHoliday = ref<boolean>(false);
const toggleShouldDeleteHoliday = () =>
  (shouldDeleteHoliday.value = !shouldDeleteHoliday.value);

const dateRange = computed(
  (): string =>
    `${formateToDateString(holiday.value.startingDate)} - ${formateToDateString(
      holiday.value.endingDate
    )}
        `
);

const publish = (): void => {
  isRequesting.value = true;
  setTimeout(() => {
    isRequesting.value = false;
    isRequested.value = true;
  }, 1000);
  setTimeout(() => {
    fetchHoliday();
    isRequested.value = false;
  }, 2000);
};
</script>
