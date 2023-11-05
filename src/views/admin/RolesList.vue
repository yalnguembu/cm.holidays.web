<template>
  <div class="2xl:mt-8">
    <RoleCreationModal
        v-if="shouldDisplayCreationModal"
        @close="toggleShouldDisPlayCreationModal"
        @created="() =>{ toggleShouldDisPlayCreationModal(); fetchRoles()}"
    />
    <HeaderComponent
        title="Roles"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    >
      <CreationButton
          title="New Role"
          @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <section data-test="roles-list" class="h-full w-full flex flex-col justify-center items-center min-h-[70vh]">
      <OpenFolderIcon class="stroke-gray-500/10 h-[20rem]" />
      <p class="text-xl text-gray-500 text-center 2xl:w-1/4"> No roles has already been created! Please click on the button up there to create a new one. </p>
    </section>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreationButton from "@/components/CreationButton.vue";
import RoleCreationModal from "@/components/modals/RoleCreationModal.vue";
import {Role} from "@/domain/Role";
import {useRoleStore} from "@/store/role";
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
const isRoleListLoading = ref<boolean>(false)
const roles = ref<Role[]>([])
const fetchRoles = async () => {
  isRoleListLoading.value = true;
  roles.value = await useRoleStore().getAllRoles();
  isRoleListLoading.value = false;
}

onBeforeMount(()=>{
  fetchRoles();
})
</script>
