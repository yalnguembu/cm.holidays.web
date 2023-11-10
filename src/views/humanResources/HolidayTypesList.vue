<template>
  <div>
    <HolidayTypeCreationModal
      v-if="shouldDisplayCreationModal"
      @created="
        () => {
          toggleShouldDisPlayCreationModal();
          fetchHolidayType();
        }
      "
      @close="toggleShouldDisPlayCreationModal"
    />
    <HeaderComponent
      title="Holiday type"
      description="List of types of leave taken into account"
    >
      <CreationButton
        title="New HolidayType"
        @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <section
      v-if="isHolidayTypeLoading"
      class="w-full flex items-center justify-center min-h-[60vh]"
    >
      <SpinnerLoader class="h-14 w-14" />
    </section>
    <section
      class="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8 xl:grid-cols-4"
      v-else-if="holidayTypes.length"
    >
      <HolidayTypeListItem
        v-for="holidayType in holidayTypes"
        :post="holidayType"
        :id="holidayType.id"
        :name="holidayType.name"
        :description="holidayType.description"
        @created="
          () => {
            toggleShouldDisPlayCreationModal();
            fetchHolidayType();
          }
        "
      />
    </section>
    <section
      v-else
      data-test="roles-list"
      class="h-full w-full flex flex-col justify-center items-center min-h-[60vh] 2xl:min-h-[70vh]"
    >
      <OpenFolderIcon class="stroke-gray-500/10 h-[15rem] lg:h-[20rem]" />
      <p class="text-xl text-gray-500 text-center w-1/2 2xl:w-1/4">
        No post has already been created! Please click on the button up there to
        create a new one.
      </p>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreationButton from "@/components/CreationButton.vue";
import HolidayTypeCreationModal from "@/components/modals/HolidayTypeCreationModal.vue";
import HolidayTypeListItem from "@/components/HolidayTypeListItem.vue";
import { HolidayType } from "@/domain/HolidayType";
import { RequestsStatus } from "@/utils/api";
import OpenFolderIcon from "@/components/icons/OpenFolderIcon.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import { useHolidayTypeStore } from "@/store/holidayType";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
  (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const isHolidayTypeLoading = ref<boolean>(false);
const holidayTypes = ref<HolidayType[]>([]);

const fetchHolidayType = async () => {
  isHolidayTypeLoading.value = true;
  const apiResponse = await useHolidayTypeStore().getAllHolidayTypes();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    holidayTypes.value = apiResponse.data ?? [];
  isHolidayTypeLoading.value = false;
};

onBeforeMount(() => {
  fetchHolidayType();
});
</script>
