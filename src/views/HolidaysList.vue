<template>
  <main class="flex w-full justify-center">
    <div
      :class="[
        'p-4 lg:p-8 max-w-screen-xl w-full block',
        { 'overflow-hidden max-h-96': isFormVisible },
      ]"
    >
      <div class="flex flex-row justify-between items-center p-4 md:p-0">
        <TheBreadcrumb />
        <NewHolidayButton v-if="isHolidays" @click="toggleFormModal" />
      </div>
      <div
        v-if="isLoading"
        class="gap-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3"
      >
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
          @click="showDetails(holiday.id)"
          :holiday="holiday"
        />
      </div>
      <div v-else class="pt-4 flex flex-col items-center justify-center">
        <img src="../assets/empty-holiday.svg" alt="sorry it is no holiday" />
        <p class="text-base">No holiday has been created</p>
        <BaseButton
          title="Create holiday"
          class="mt-4 text-base py-2"
          @click="toggleFormModal"
        />
      </div>
    </div>
    <HolidayDetails
      :holidayId="activeHolidayId"
      v-if="isHolidayDetailsVisible"
      @close="toggleHolidayDetailsVisibility"
    />
    <CreationHolidayForm v-if="isFormVisible" @close="toggleFormModal" />
  </main>
</template>

<script setup lang="ts">
import TheBreadcrumb from "@/components/TheBreadcrumb.vue";
import BaseButton from "@/components/BaseButton.vue";
import HolidayItem from "@/components/HolidayItem.vue";
import HolidayItemSkelton from "@/components/HolidayItemSkelton.vue";
import NewHolidayButton from "@/components/CreationHolidayButton.vue";
import CreationHolidayForm from "@/components/CreationHolidayForm.vue";
import HolidayDetails from "@/components/HolidayDetails.vue";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { Holiday } from "@/domain/Holiday";
import { useHolidayStore } from "@/store/holiday";

const holidayStore = useHolidayStore();
const emit = defineEmits(["close"]);

const isFormVisible = ref<boolean>(false);
const holidays = ref<Holiday[]>([]);

const isHolidays = computed(() => {
  return holidays.value.length;
});

const isLoading = ref<boolean>(false);

const fetchHolidays = async (): Promise<void> => {
  isLoading.value = true;
  holidays.value = await holidayStore.getHollidaysByOwner();
  setTimeout(() => (isLoading.value = false), 500);
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
