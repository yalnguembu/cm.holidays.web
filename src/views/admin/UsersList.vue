<template>
  <div :class="['py-8 w-full block']">
    <HeaderComponent
      class="mb-4"
      title="Users"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    >
      <CreationButton
        title="New User"
        @click.stop="toggleShouldCreateUser"
      />
    </HeaderComponent>
    <UserListFilter v-if="true" class="mb-8" />
    <UsersDataGrid :isLoading="isLoading" :users="users" />
    <UserCreationModal
      v-if="isPermittedToCreateUser"
      @close="toggleShouldCreateUser"

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
import { RequestsStatus } from "@/utils/api";

const users = ref<Employee[]>([]);

const isLoading = ref<boolean>(false);

const isPermittedToCreateUser = ref<boolean>(false);
const toggleShouldCreateUser = () =>
  (isPermittedToCreateUser.value = !isPermittedToCreateUser.value);

const fetchUsers = async (): Promise<void> => {
  isLoading.value = true;
  const fetchedUsersResponse = await useEmployeeStore().getAllEmployees();
  if (fetchedUsersResponse.status === RequestsStatus.SUCCESS)
    users.value = fetchedUsersResponse.data ?? [];
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchUsers();
});
</script>
