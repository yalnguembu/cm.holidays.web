<template>
  <div
    :class="[
      'p-4 lg:p-8 block relative xl:px-0',
      { 'overflow-hidden max-h-screen': isFormVisible },
    ]"
  >
    <HeaderComponent
      class="mb-8"
      title="Holiday requests"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit"
    >
      <CreationButton
        title="New holiday request"
        v-if="isHolidays"
        @click.stop="toggleFormModal"
      />
    </HeaderComponent>
    <div v-if="isLoading" class="gap-8 mt- grid md:grid-cols-2 lg:grid-cols-3">
      <HolidayItemSkelton v-for="index in 6" :key="index" />
    </div>
    <div
      v-else-if="isHolidays"
      class="gap-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3"
    >
      <HolidayItem
        class="hover:cursor-pointer"
        v-for="holiday in holidays"
        :key="holiday.id"
        @click.stop="showDetails(holiday.id)"
        :holiday="holiday"
      />
    </div>
    <div v-else class="pt-4 flex flex-col items-center justify-center">
      <img src="../assets/empty-holiday.svg" alt="sorry it is no holiday" />
      <p class="text-base">No holiday has been created</p>
      <BaseButton
        title="Create holiday"
        class="mt-4 text-base py-2 bg-blue-primary text-white"
        @click.stop="toggleFormModal"
      />
    </div>
  </div>
  <HolidayDetails
    :holidayId="activeHolidayId"
    v-if="isHolidayDetailsVisible"
    @close="toggleHolidayDetailsVisibility"
  />
  <HolidayCreation
    @created="
      () => {
        toggleFormModal();
        fetchHolidays();
      }
    "
    v-if="isFormVisible"
    @close="toggleFormModal"
  />
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import HolidayItem from "@/components/holidays/HolidayRequestListItem.vue";
import HolidayItemSkelton from "@/components/holidays/HolidayRequestListItemSkelton.vue";
import CreationButton from "@/components/CreationButton.vue";
import HolidayCreation from "@/components/modals/HolidayCreation.vue";
import HolidayDetails from "@/components/modals/HolidayDetails.vue";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { HolidayRequest } from "@/domain/HolidayRequest";
import { useHolidayRequestStore } from "@/store/holidayRequest";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { RequestsStatus } from "@/utils/api";

const holidayStore = useHolidayRequestStore();
const emit = defineEmits(["close"]);

const isFormVisible = ref<boolean>(false);
const holidays = ref<HolidayRequest[]>([]);

const isHolidays = computed(() => {
  return holidays.value.length;
});

const isLoading = ref<boolean>(false);

const fetchHolidays = async (): Promise<void> => {
  isLoading.value = true;
  const getAllHolidaysByAccountOwnerResponse =
    await holidayStore.getHolidayRequestsByOwner();
  if (getAllHolidaysByAccountOwnerResponse.status === RequestsStatus.SUCCESS)
    holidays.value = getAllHolidaysByAccountOwnerResponse.data ?? [];
  isLoading.value = false;
};

const toggleFormModal = () => {
  isFormVisible.value = !isFormVisible.value;
};

watch(isFormVisible, (value) => {
  !value ? fetchHolidays() : "";
});

onMounted(() => {
  fetchHolidays();
});

const activeHolidayId = ref<string>("");
const toggleHolidayDetailsVisibility = (): void => {
  isHolidayDetailsVisible.value = !isHolidayDetailsVisible.value;
};
const isHolidayDetailsVisible = ref<boolean>(false);

const showDetails = (id: string): void => {
  activeHolidayId.value = id;
  isHolidayDetailsVisible.value = true;
};
</script>
