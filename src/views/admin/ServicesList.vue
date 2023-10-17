<template>
  <div>
    <ServiceDetailsModal
      v-if="shouldDisplayDetailsModal"
      serviceId="1"
      @close="toggleShouldDisPlayDetailsModal"
    />
    <ServiceCreationModal
      v-if="shouldDisplayCreationModal"
      @close="toggleShouldDisPlayCreationModal"
      @created="() =>{ toggleShouldDisPlayCreationModal(); fetchServices()}"
    />
    <HeaderComponent
      title="Services"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    >
      <CreationButton
        title="New Service"
        @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <section
        data-test="services-list"
        class="grid grid-cols-4 gap-6 pt-8"
        v-if="services.length"
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
      class="h-full w-full flex flex-col justify-center items-center min-h-[70vh]"
  >
    <OpenFolderIcon class="stroke-gray-500/10 h-[20rem]" />
    <p class="text-xl text-gray-500 text-center 2xl:w-1/4"> No Service has already been created! Please click on the button up there to create a new one. </p>
  </section>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreationButton from "@/components/CreationButton.vue";
import ServiceCreationModal from "@/components/modals/ServiceCreationModal.vue";
import ServiceListItem from "@/components/ServiceListItem.vue";
import ServiceDetailsModal from "@/components/modals/ServiceDetailsModal.vue";
import {Service} from "@/domain/Service";
import {useServiceStore} from "@/store/service";
import OpenFolderIcon from "@/components/icons/OpenFolderIcon.vue";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
  (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const shouldDisplayDetailsModal = ref<boolean>(false);
const toggleShouldDisPlayDetailsModal = () =>
  (shouldDisplayDetailsModal.value = !shouldDisplayDetailsModal.value);

const showDetails = (id: string) => {
  toggleShouldDisPlayDetailsModal();
};
const isServiceListLoading = ref<boolean>(false)
const services = ref<Service[]>([]);

const fetchServices = async () => {
  isServiceListLoading.value = true;
  const apiResponse =  await useServiceStore().getAllServices();
  if (apiResponse.success) services.value = apiResponse.data;
  isServiceListLoading.value = false;
}

onBeforeMount(()=>{
  fetchServices();
})
</script>
