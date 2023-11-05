<template>
  <div :class="['py-8 w-full block']">
    <section>
      <HolidayListFilter v-if="holidayRequests.length" class="mb-8" />
    </section>
    <HolidaysDataGrid
      :isLoading="isLoading"
      :holidayRequests="holidayRequests"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import HolidaysDataGrid from "@/components/holidays/HolidayRequestsDataGrid.vue";
import { HolidayRequest } from "@/domain/HolidayRequest";
import { useHolidayRequestStore } from "@/store/holidayRequest";
import HolidayListFilter from "@/components/holidays/HolidayListFilter.vue";
import { onBeforeMount } from "vue";
import { RequestsStatus } from "@/utils/api";

const holidayStore = useHolidayRequestStore();
const holidayRequests = ref<HolidayRequest[]>([]);

const isLoading = ref<boolean>(false);

const fetchHolidays = async (): Promise<void> => {
  isLoading.value = true;
  const getAllHolidaysByAccountOwnerResponse =
    await holidayStore.getAllHolidayRequests();
  if (getAllHolidaysByAccountOwnerResponse.status === RequestsStatus.SUCCESS)
    holidayRequests.value = getAllHolidaysByAccountOwnerResponse.data ?? [];
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchHolidays();
});
</script>
