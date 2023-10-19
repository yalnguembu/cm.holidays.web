<template>
  <div :class="['py-8 w-full block']">
    <HeaderComponent
      class="mb-4"
      title="Users"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    >
      <CreationButton
        title="New User"
        @click.stop="toggleshoulCreateUser"
      />
    </HeaderComponent>
    <UserListFilter v-if="true" class="mb-8" />
    <UsersDataGrid :isLoading="false" :users="users" />
    <UserCreationModal
      v-if="shoulCreateUser"
      @close="toggleshoulCreateUser"

    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import UsersDataGrid from "@/components/UsersDataGrid.vue";
import { Employee } from "@/domain/Employee";
import { useEmployeeStore } from "@/store/employee";
import UserListFilter from "@/components/UserListFilter.vue";
import { onBeforeMount } from "vue";
import CreationButton from "@/components/CreationButton.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserCreationModal from "@/components/modals/UserCreationModal.vue";
import { ResquestStatus } from "@/utils/api";

const users = ref<Employee[]>([]);

const isLoading = ref<boolean>(false);

const shoulCreateUser = ref<boolean>(false);
const toggleshoulCreateUser = () =>
  (shoulCreateUser.value = !shoulCreateUser.value);

const fetchUsers = async (): Promise<void> => {
  isLoading.value = true;
  const fecthedUsersResponse = await useEmployeeStore().getAllEmployees();
  if (fecthedUsersResponse.status === ResquestStatus.SUCCESS)
    users.value = fecthedUsersResponse.data ?? [];
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchUsers();
});
</script>
