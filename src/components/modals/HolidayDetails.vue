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
            class="items-center flex flex-col w-full h-full justify-center justify-center"
            v-if="requestStatus !== null"
        >
          <CheckCircleIcon
              v-if="requestStatus === RequestsStatus.SUCCESS"
              class="w-[8rem] h-[8rem] stroke-green-500 block inline"
          />
          <ErrorIcon
              v-else
              class="w-[8rem] h-[8rem] stroke-gray-300 block inline"
          />
          <p class="text-gray-500 text-lg mt-4">
            {{ requestResponseMessage }}
          </p>
        </div>
        <template
            v-else>
          <div
              class="w-20 h-20 rounded-full border-8 border-gray-100 dark:border-gray-400 relative animate-spin"
          >
            <div
                class="w-4 h-4 absolute -top-1 left-0 rounded-full bg-blue-500"
            />
          </div>
          <p class="text-gray-500 text-lg mt-4">Progressing...</p>
        </template>
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
                  :title="isRequesting ? 'Publishing' : 'Publish'"
                  class="ml-4 shadow-none text-base hover:shadow-md bg-blue-primary text-white hover:shadow-blue-primary/50"
                  @click="handelPublishHoliday"
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
import {computed, onBeforeMount, ref} from "vue";
import BaseButton from "../BaseButton.vue";
import EditionHolidayForm from "@/components/holidays/EditionHolidayRequest.vue";
import {type HolidayRequest, newNullHolidayRequest,} from "@/domain/HolidayRequest";
import {useHolidayRequestStore} from "@/store/holidayRequest";
import {HOLIDAY_STATUS} from "@/utils/enum";
import {formateToDateString} from "@/utils/string";
import {timetampsToString} from "@/utils/common";
import {soutractTwoDates} from "@/utils/date";
import EditIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import HolidayDetailsSkelton from "@/components/holidays/HolidayDetailsSkelton.vue";
import HolidayDelete from "@/components/holidays/DeleteHolidayBox.vue";
import HolidayStatus from "@/components/StatusBage.vue";
import {useRoute} from "vue-router";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import {RequestsStatus} from "@/utils/api";
import ErrorIcon from "@/components/icons/ErrorIcon.vue";

const props = defineProps({
  holidayId: {
    type: String,
    required: true,
  },
});

const holiday = ref<HolidayRequest>(newNullHolidayRequest());

const route = useRoute();

const emits = defineEmits<{
  (event: "close"): void;
}>();
const isEmployee: boolean = route.meta?.requiredRolesList?.includes("EMPLOYEE");
const isHumanResource: boolean =
  route.meta?.requiredRolesList?.includes("HUMAN_RESOURCE");

const fetchHoliday = async () => {
  isLoading.value = true;
  const getHolidayRequestByIdResponse =
    await useHolidayRequestStore().getHolidayRequestById(props.holidayId ?? "");
  if (getHolidayRequestByIdResponse.status === RequestsStatus.SUCCESS)
    holiday.value = getHolidayRequestByIdResponse.data ?? newNullHolidayRequest();

  isLoading.value = false;
};

onBeforeMount(() => {
  fetchHoliday();
});

const isLoading = ref<boolean>(false);
const isRequesting = ref<boolean>(false);
const requestStatus = ref<RequestsStatus | null>(null);
const requestResponseMessage = ref<string>("");

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

const publishHoliday = async (): Promise<void> => {
  isRequesting.value = true;
  const holidayPublishResponse = await useHolidayRequestStore().publishHolidayRequest(props.holidayId);

  requestStatus.value = holidayPublishResponse.status
  if(requestStatus.value === RequestsStatus.SUCCESS)
    requestResponseMessage.value = "Holiday successfully published";
  else requestResponseMessage.value = "Oups something went wrong"
  setTimeout(
    () => isRequesting.value = false,
    2000
  );
};
const handelPublishHoliday = () =>{
  publishHoliday();
  fetchHoliday();
}
</script>
