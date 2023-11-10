<template>
  <div class="2xl:mt-8">
    <RoleCreationModal
        v-if="shouldDisplayCreationModal"
        @close="toggleShouldDisPlayCreationModal"
        @created="() =>{ toggleShouldDisPlayCreationModal(); fetchRoles()}"
    />
    <HeaderComponent
        title="Roles"
        description="List of roles within the system with their status"
    >
      <CreationButton
          title="New Role"
          @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <section
        v-if="isRoleListLoading"
        class="w-full flex items-center justify-center min-h-[60vh]"
    >
      <SpinnerLoader class="h-14 w-14" />
    </section>
    <section
        class="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8 xl:grid-cols-4"
        v-else-if="roles.length"
    >
      <HolidayTypeListItem
          v-for="role in roles"
          :id="role.id"
          :name="formatRoleType(role.type)"
          :description="role.description"
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
import {onBeforeMount, Ref, ref} from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreationButton from "@/components/CreationButton.vue";
import RoleCreationModal from "@/components/modals/RoleCreationModal.vue";
import {Role} from "@/domain/Role";
import {useRoleStore} from "@/store/role";
import OpenFolderIcon from "@/components/icons/OpenFolderIcon.vue";
import {useHolidayTypeStore} from "@/store/holidayType";
import {RequestsStatus} from "@/utils/api";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import HolidayTypeListItem from "@/components/HolidayTypeListItem.vue";
import {formatRoleType} from "@/utils/string";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
    (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const isRoleListLoading = ref<boolean>(false)
const roles = ref<Role[]>([]) as Ref<Role[]>;
const fetchRoles = async (): Promise<void> => {
  isRoleListLoading.value = true;
  const apiResponse =  await useRoleStore().getAllRoles();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    roles.value = apiResponse.data ?? [];
  isRoleListLoading.value = false;
}

onBeforeMount(()=>{
  fetchRoles();
})
</script>
