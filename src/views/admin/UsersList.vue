<template>
  <div :class="['py-8 w-full block']">
    <HeaderComponent
        class="mb-4"
        title="Users"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    >
      <CreationButton
          title="New User"
          @click.stop="toggleShouldDisPlayCreationModal"
      />
    </HeaderComponent>
    <UserListFilter v-if="true" class="mb-8" />
    <UsersDataGrid :isLoading="false" :users="users" />
    <UserCreationModal
        v-if="shouldDisplayCreationModal"
        @close="toggleShouldDisPlayCreationModal"
        @created="() =>{ toggleShouldDisPlayCreationModal(); fetchUsers()}"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import UsersDataGrid from "@/components/UsersDataGrid.vue";
import { HolidayRequest } from "@/domain/HolidayRequest";
import { useHolidayRequestStore } from "@/store/holidayRequest";
import UserListFilter from "@/components/UserListFilter.vue";
import { onBeforeMount } from "vue";
import CreationButton from "@/components/CreationButton.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserCreationModal from "@/components/modals/UserCreationModal.vue";

const holidayStore = useHolidayRequestStore();

const users = ref<HolidayRequest[]>([]);

const isLoading = ref<boolean>(false);

const shouldDisplayCreationModal = ref<boolean>(false);
const toggleShouldDisPlayCreationModal = () =>
    (shouldDisplayCreationModal.value = !shouldDisplayCreationModal.value);

const shouldDisplayDetailsModal = ref<boolean>(false);
const toggleShouldDisPlayDetailsModal = () =>
    (shouldDisplayDetailsModal.value = !shouldDisplayDetailsModal.value);

const fetchUsers = async (): Promise<void> => {
  isLoading.value = true;
  users.value = [] // await holidayStore.getAllHollidays();
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchUsers();
});
</script>
