<template>
  <section
    class="bg-gray-100 md:bg-stone-800/75 transition duration 500 fixed inset-0 top-0 md:top-0 flex flex-row md:items-center justify-center overflow-y-auto"
  >
    <button class="w-full h-full block" @click="close" />
    <div
      class="absolute flex flex-col items-center justify-center t-0 p-4 md:w-3/4 lg:w-2/3 xl:w-1/2 md:border md:rounded-xl md:p-6 md:shadow-lg md:bg-white md:min-h-[60vh]"
    >
      <EditionHolidayForm
        :holiday="holiday"
        v-if="isEditFormVisivle"
        @canceled="toggleEditionFormVisibility"
        @edited="fetchHoliday"
      />
      <HolidayDelete
        @close="toggleDeleteContentVisivleVisibility"
        v-else-if="isDeleteContentVisivle"
        :isLoading="isLoading"
      />
      <div v-else-if="isRequessing">
        <div
          class="w-20 h-20 rounded-full border-8 border-gray-100 dark:border-gray-400 relative animate-spin"
        >
          <div
            class="w-4 h-4 absolute -top-1 left-0 rounded-full bg-blue-500"
          />
        </div>
        <p class="text-gray-500 text-lg mt-4">Requessing</p>
      </div>
      <div
        class="items-center flex flex-col w-full h-full justify-center justify-center"
        v-else-if="isRequested"
      >
        <CheckCircleIcon class="w-[8rem] h-[8rem] stroke-green-500 block" />
        <p class="text-gray-500 text-lg mt-4">Holiday requested succesfuly</p>
      </div>
      <div class="w-full" v-else>
        <HolidayDetailsSkelton v-if="isLoading" />
        <template v-else>
          <div class="flex justify-between mb-4">
            <h2 class="text-3xl font-bold" data-test="form-title">Details</h2>
            <div>
              <template
                v-if="holiday.status === HOLIDAY_STATUS.DRAFT && isPublic"
              >
                <button
                  class="p-2 h-fit border-2 border-transparent font-bold text-gray-500 transition hover:shadow duration-500 hover:border-blue-primary hover:text-blue-primary rounded"
                  @click="toggleEditionFormVisibility"
                >
                  <EditIcon />
                </button>
                <button
                  class="p-2 h-fit border-2 border-transparent mx-2 font-bold text-gray-500 transition hover:shadow duration-500 hover:border-red-600 hover:text-red-600 rounded"
                  @click="toggleDeleteContentVisivleVisibility"
                >
                  <TrashIcon />
                </button>
                <BaseButton
                  title="Request"
                  class="ml-4 shadow-none text-base hover:shadow-md hover:shadow-blue-primary/50"
                  @click="publish"
                />
              </template>
              <template
                v-else-if="
                  holiday.status === HOLIDAY_STATUS.PENDING && !isPublic
                "
              >
                <button
                  class="p-2 px-4 h-fit font-bold text-gray-500 transition hover:shadow duration-500 hover:bg-blue-primary text-blue-primary hover:text-white rounded"
                >
                  Approuve
                </button>
                <button
                  class="p-2 px-4 h-fit ml-4 font-bold text-gray-500 transition hover:shadow duration-500 hover:bg-red-600 text-red-600 hover:text-white rounded"
                  @click="toggleDeleteContentVisivleVisibility"
                >
                  Reject
                </button>
              </template>
              <HolidayStatus :value="holiday.status" v-else />
            </div>
          </div>
          <div data-test="holiday-details" class="">
            <p class="text-gray-500 text-sm" data-test="created-at my-2">
              {{ `Demande cree ${timetampsToString(holiday.createdAt)}` }}
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
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import BaseButton from "./BaseButton.vue";
import EditionHolidayForm from "./EditionHolidayForm.vue";
import { type Holiday, newNullHoliday } from "@/domain/Holiday";
import { useHolidayStore } from "@/store/holiday";
import { HOLIDAY_STATUS } from "@/utils/enum";
import { formateToDateString } from "@/utils/string";
import { timetampsToString } from "@/utils/common";
import { soutractTwoDates } from "@/utils/date";
import EditIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
CheckCircleIcon;
import HolidayDetailsSkelton from "@/components/HolidayDetailsSkelton.vue";
import HolidayDelete from "@/components/HolidayDelete.vue";
import HolidayStatus from "@/components/HolidayStatus.vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  holidayId: {
    type: String,
    required: true,
  },
});

const holiday = ref<Holiday>(newNullHoliday());
const router = useRouter();

const emits = defineEmits<{
  (event: "close"): void;
}>();
const close = (): void => {
  emits("close");
};
const isPublic: boolean = useRoute().meta?.isPublic as boolean;

const fetchHoliday = async () => {
  isLoading.value = true;
  holiday.value = await useHolidayStore().getHolidayById(props.holidayId);
  setTimeout(() => (isLoading.value = false), 500);
};

onBeforeMount(() => {
  fetchHoliday();
});

const isLoading = ref<boolean>(false);
const isRequessing = ref<boolean>(false);
const isRequested = ref<boolean>(false);

const isEditFormVisivle = ref<boolean>(false);
const toggleEditionFormVisibility = () =>
  (isEditFormVisivle.value = !isEditFormVisivle.value);

const isDeleteContentVisivle = ref<boolean>(false);
const toggleDeleteContentVisivleVisibility = () =>
  (isDeleteContentVisivle.value = !isDeleteContentVisivle.value);

const dateRange = computed(
  (): string =>
    `${formateToDateString(holiday.value.startingDate)} - ${formateToDateString(
      holiday.value.endingDate
    )}
        `
);

const publish = (): void => {
  isRequessing.value = true;
  setTimeout(() => {
    isRequessing.value = false;
    isRequested.value = true;
  }, 1000);
  setTimeout(() => {
    fetchHoliday();
    isRequested.value = false;
  }, 2000);
};
</script>
