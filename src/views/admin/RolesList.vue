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
    <section data-test="roles-list" class="min-h-[70vh] relative">
      <div v-if="isRoleListLoading" class="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2">
        <SpinnerLoader class="h-14 w-14 " />
      </div>
      <template v-else>
        <div v-if="roles.length" class="flex flex-wrap gap-x-2.5 mt-6">
          <div
              v-for="role in roles" :key="role.id"
              class="border p-6 rounded-lg h-42 overflow-hidden hover:bg-gray-100/30 hover:shadow-lg relative">
            <h4 class="text-blue-900 font-semibold text-2xl mb-4 flex gap-x-2">
              <span>{{ role.type.split('_').join(" ") }}</span>
              <StatutBadge :is-active="role.isActive" />
            </h4>
            <p class="text-gray-500 text-sm line-clamp-3">{{role.description}}</p>
          </div>
        </div>
        <div v-else class="flex flex-col justify-center items-center">
          <OpenFolderIcon class="stroke-gray-500/10 h-[20rem]" />
          <p class="text-xl text-gray-500 text-center 2xl:w-1/4">
            No roles has already been created! Please click on the button up there to create a new one.
          </p>
        </div>
      </template>
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
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import StatutBadge from "@/components/badges/StatutBadge.vue";

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
    (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const isRoleListLoading = ref<boolean>(false)
const roles = ref<Role[]>([]) as Ref<Role[]>;
const fetchRoles = async (): Promise<void> => {
  isRoleListLoading.value = true;
  const rolesResponse = await useRoleStore().getAllRoles();
  roles.value = rolesResponse.data as Role[];
  isRoleListLoading.value = false;
}

onBeforeMount(()=>{
  fetchRoles();
})
</script>
