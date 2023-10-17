<template>
  <ModalWrapper @close="$emit('close')">
    <div
      class="w-[30rem] transition duration-300 overflow-y-auto min-h-[15rem] max-h-[25rem] border rounded-xl p-6 shadow-lg bg-white"
    >
      <ServiceEdition
        :service="service"
        v-if="shouldEditHoliday"
        @canceled="toggleEditionFormVisibility"
        @edited="fetchService"
      />
      <HolidayDelete
        @close="toggleShouldDeleteHoliday"
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
        <CheckCircleIcon class="w-[8rem] h-[8rem] stroke-green-500 block" />
        <p class="text-gray-500 text-lg mt-4">
          HolidayRequest requested successfully
        </p>
      </div>
      <div class="w-full" v-else>
        <HolidayDetailsSkelton v-if="isLoading" />
        <template v-else>
          <div class="flex justify-between sticky -top-6 w-full bg-white">
            <h4 class="text-blue-900 font-semibold text-2xl mb-4">
              {{ service.name ?? "UX/UI Design" }}
            </h4>
            <div>
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
            </div>
          </div>
          <div data-test="service-details">
            <RouterLink
              to="users/"
              class="w-full flex items-center mb-2 text-sm text-gray-800 hover:text-blue-500 hover:fill-blue-500 font-semibold"
              @click="shouldDisplayPosts = !shouldDisplayPosts"
            >
              <EmployeesIcon
                class="stroke-1 stroke-gray-500 fill-gray-500 w-6 mr-3"
              />
              <span class="mr-2">{{ 12 }}</span>
              <span> Employees </span>
            </RouterLink>
            <p class="text-sm text-gray-500" data-test="created-at">
              Since
              <span class="font-semibold">{{
                `${timetampsToString(service.createdAt)}`
              }}</span>
            </p>
            <p class="text-gray-800 my-3" data-test="description">
              {{
                // service.description ??
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem."
              }}
            </p>
            <div>
              <div
                class="w-full flex justify-between items-center border-b pb-1 hover:cursor-pointer"
                @click="shouldDisplayPosts = !shouldDisplayPosts"
              >
                <h6 class="text-basis text-gray-800 font-semibold">Posts</h6>
                <ArrowDownIcon
                  :class="[
                    'stroke-1 w-3 h-3 transition duration-300',
                    { 'rotate-180': shouldDisplayPosts },
                  ]"
                />
              </div>
              <ul v-if="shouldDisplayPosts" class="decoration-clone pl-8 pb-4">
                <li
                  class="text-gray-500 text-sm list-disc"
                  v-for="index in 5"
                  :key="index"
                >
                  <RouterLink
                    to="posts/id"
                    class="hover:text-blue-500 block p-2 py-1 pl-0 hover:underline underline-offset-4"
                  >
                    Data analyst
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import ServiceEdition from "./ServiceEdition.vue";
import { timetampsToString } from "@/utils/common";
import EditIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import HolidayDetailsSkelton from "@/components/holidays/HolidayDetailsSkelton.vue";
import HolidayDelete from "@/components/holidays/DeleteHolidayBox.vue";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon.vue";
import EmployeesIcon from "@/components/icons/EmployeesIcon.vue";
import {newNullService, Service} from "@/domain/Service";
import {useServiceStore} from "@/store/service";

const props = defineProps({
  serviceId: {
    type: String,
    required: true,
  },
});

const service = ref<Service>(newNullService());

const emits = defineEmits<{
  (event: "close"): void;
}>();
const close = (): void => {
  emits("close");
};

const fetchService = async () => {
  isLoading.value = true;
  service.value = await useServiceStore().getServiceById(
    props.serviceId
  );
  setTimeout(() => (isLoading.value = false), 500);
};

onBeforeMount(() => {
  fetchService();
});

const isLoading = ref<boolean>(false);
const isRequesting = ref<boolean>(false);
const isRequested = ref<boolean>(false);

const shouldEditHoliday = ref<boolean>(false);
const shouldDisplayPosts = ref<boolean>(false);
const toggleEditionFormVisibility = () =>
  (shouldEditHoliday.value = !shouldEditHoliday.value);

const shouldDeleteHoliday = ref<boolean>(false);
const toggleShouldDeleteHoliday = () =>
  (shouldDeleteHoliday.value = !shouldDeleteHoliday.value);
</script>
