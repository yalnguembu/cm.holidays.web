<template>
  <div
    :data-test="`service-${service.id}`"
    class="border p-6 rounded-lg h-42 overflow-hidden hover:bg-gray-100/30 cursor-pointer hover:shadow-lg relative group"
  >
    <h4 class="text-blue-900 font-semibold text-2xl mb-4 flex gap-x-2">
      {{ service.name }}
      <StatutBadge :is-active="service.isActive" />
    </h4>
    <p class="text-gray-500 text-sm line-clamp-3">
      {{ service.description }}
    </p>
    <ListItemOption
      :isActive="service.isActive"
      @edit="toggleEditionFormVisibility"
      @delete="toggleShouldDeleteService"
      @deactivate="toggleShouldDeactivateService"
      @activate="toggleShouldActivateService"
    />
  </div>
  <ServiceEdition
    data-test="service-edition-modal"
    :service="service"
    v-if="shouldEditService"
    @cancel="toggleEditionFormVisibility"
    @edited="$emit('update')"
  />
  <ConfirmationModal
    data-test="service-delete-modal"
    title="Delete Service"
    :description="`By click on the confirm button the service will ${service.name} be deleted are you agree`"
    :theme="COLOR_THEME.RED"
    @close="toggleShouldDeleteService"
    @confirm="toggleShouldDeleteService"
    v-if="shouldDeleteService"
    :isLoading="isLoading"
  />
  <ConfirmationModal
    data-test="service-activation-modal"
    title="Activate Service"
    :description="`By click on the confirm button the service ${service.name} will be activate are you agree`"
    @close="toggleShouldActivateService"
    @confirm="activate"
    v-if="shouldActivateService"
    :isLoading="isLoading"
  />
  <ConfirmationModal
    data-test="service-disactivation-modal"
    title="Deactivate Service"
    :theme="COLOR_THEME.RED"
    :description="`By click on the confirm button the service will ${service.name} be deactivate are you agree`"
    @close="toggleShouldDeactivateService"
    @confirm="deactivate"
    v-if="shouldDeactivateService"
    :isLoading="isLoading"
  />
</template>
<script lang="ts" setup>
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";
import ServiceEdition from "@/components/modals/ServiceEdition.vue";
import { PropType, ref } from "vue";
import { Service } from "@/domain/Service";
import ListItemOption from "@/components/ListItemOption.vue";
import { COLOR_THEME } from "@/utils/enum";
import { useServiceStore } from "@/store/service";
import { RequestsStatus } from "@/utils/api";
import StatutBadge from "@/components/badges/StatutBadge.vue";

const props = defineProps({
  service: {
    type: Object as PropType<Service>,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const isLoading = ref<boolean>(false);

const shouldEditService = ref<boolean>(false);
const toggleEditionFormVisibility = () =>
  (shouldEditService.value = !shouldEditService.value);

const shouldDeleteService = ref<boolean>(false);
const toggleShouldDeleteService = () =>
  (shouldDeleteService.value = !shouldDeleteService.value);

const shouldActivateService = ref<boolean>(false);
const toggleShouldActivateService = () =>
  (shouldActivateService.value = !shouldActivateService.value);

const shouldDeactivateService = ref<boolean>(false);
const toggleShouldDeactivateService = () =>
  (shouldDeactivateService.value = !shouldDeactivateService.value);

const activate = async () => {
  isLoading.value = true;
  const activationResponse = await useServiceStore().activateServiceById(
    props.service.id
  );
  if (activationResponse.status === RequestsStatus.SUCCESS) {
    toggleShouldActivateService();
    emit("update");
  }
  isLoading.value = false;
};

const deactivate = async () => {
  isLoading.value = true;
  const deactivationResponse = await useServiceStore().deactivateServiceById(
    props.service.id
  );
  if (deactivationResponse.status === RequestsStatus.SUCCESS) {
    toggleShouldActivateService();
    emit("update");
  }
  isLoading.value = false;
};
</script>
