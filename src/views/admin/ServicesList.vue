<template>
  <div>
    <ServiceCreationModal
      v-if="shouldDisplayCreationModal"
      @close="toggleShouldDisPlayCreationModal"
      @created="
        () => {
          toggleShouldDisPlayCreationModal();
          fetchServices();
        }
      "
    />
    <HeaderComponent
      title="Services"
      description="List of the company's existing departments"
    >
      <CreationButton
        title="New Service"
        @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <section
      v-if="isServiceListLoading"
      class="w-full flex items-center justify-center min-h-[60vh]"
    >
      <SpinnerLoader class="h-14 w-14" />
    </section>
    <section
      data-test="services-list"
      class="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8 xl:grid-cols-4"
      v-else-if="services.length"
    >
      <ServiceListItem
        v-for="service in services"
        :service="service"
        @update="fetchServices"
      />
    </section>
    <section
      v-else
      data-test="roles-list"
      class="h-full w-full flex flex-col justify-center items-center min-h-[60vh] 2xl:min-h-[70vh]"
    >
      <OpenFolderIcon class="stroke-gray-500/10 h-[20rem]" />
      <p class="text-xl text-gray-500 text-center w-1/2 2xl:w-1/4">
        No Service has already been created! Please click on the button up there
        to create a new one.
      </p>
    </section>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, Ref, ref} from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreationButton from "@/components/CreationButton.vue";
import ServiceCreationModal from "@/components/modals/ServiceCreationModal.vue";
import ServiceListItem from "@/components/ServiceListItem.vue";
import { Service } from "@/domain/Service";
import { useServiceStore } from "@/store/service";
import OpenFolderIcon from "@/components/icons/OpenFolderIcon.vue";
import { RequestsStatus } from "@/utils/api";
import SpinnerLoader from "@/components/SpinnerLoader.vue";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
  (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const isServiceListLoading = ref<boolean>(false);
const services = ref<Service[]>([]) as Ref<Service[]>;

const fetchServices = async () => {
  isServiceListLoading.value = true;
  const apiResponse = await useServiceStore().getAllServices();

  if (apiResponse.status === RequestsStatus.SUCCESS)
    services.value = apiResponse.data ?? [];

  isServiceListLoading.value = false;
};

onBeforeMount(() => {
  fetchServices();
});
</script>
