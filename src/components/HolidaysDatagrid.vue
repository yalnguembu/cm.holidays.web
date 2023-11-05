<template>
  <div>
    <HolidaysListSkelton v-if="isLoading" />

    <table v-else class="w-full column-fixed shadow rounded overflow-hidden">
      <thead class="bg-blue-primary text-white text-left">
        <tr>
          <th class="p-4 px-6">Users</th>
          <th class="p-4 px-6">Type</th>
          <th class="p-4 px-6">Statut</th>
          <th class="p-4 px-6">Duration</th>
          <th class="p-4 px-6">Request date</th>
        </tr>
      </thead>
      <tbody class="overflow-auto max-h-96" v-if="holidays.length">
        <tr
          class="border-t hover:bg-gray-100 cursor-pointer"
          v-for="holiday in holidays"
          :key="holiday.id"
          @click="showDetails(holiday.id)"
        >
          <td class="p-4 px-6 text-blue-primary font-semibold text-lg">
            Jhon Doe
          </td>
          <td class="p-4 px-6">{{ holiday.holidayType }}</td>
          <td class="p-4 px-6">
            <HolidayStatus :value="holiday.status" />
          </td>
          <td class="p-4 px-6 font-semibold">
            {{ soutractTwoDates(holiday.startingDate, holiday.endingDate) }}
            d
          </td>
          <td class="p-4 px-6 text-gray-500 font-semibold">
            {{ dateToLocalString(holiday.createdAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <HolidayDetails
    @close="toggleDetailsModalModal"
    :holidayId="activeHolidayRequestId"
    v-if="isDetailsModalVisible"
  />
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { Holiday } from "@/domain/Holiday";
import HolidayStatus from "@/components/HolidayStatus.vue";
import HolidayDetails from "@/components/HolidayDetails.vue";
import HolidaysListSkelton from "@/components/HolidaysListSkelton.vue";
import { dateToLocalString, soutractTwoDates } from "@/utils/date";

defineProps({
  holidays: {
    type: Array<Holiday>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const isDetailsModalVisible = ref<boolean>(false);
const activeHolidayRequestId = ref<string>("");

const toggleDetailsModalModal = () => {
  isDetailsModalVisible.value = !isDetailsModalVisible.value;
};

const showDetails = (id: string): void => {
  activeHolidayRequestId.value = id;
  console.log(id);
  toggleDetailsModalModal();
};

// watch(isDetailsModalVisible, (value) => {
//   !value ? fetchHolidays() : "";
// });
</script>
