<template>
  <div
    class="container h-full text-center px-4 flex justify-between items-center"
  >
    <section
      v-if="isAdmin"
      class="h-[70vh] text-center px-4 flex flex-col justify-between items-center"
    >
      <div
        class="w-full h-fit mt-4 items-center justify-center space-x-8 md:flex"
      >
        <RouterLink
          to="human-resource/holiday-requests"
          class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72 hover:text-blue-500"
        >
          <ListIcon class="block mr-4 h-10 stroke-2 stoke-gray-500" />
          <br />
          <span class="text-xl font-bold mt-8">Services</span>
        </RouterLink>
        <RouterLink
          to="human-resource/employees"
          class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72 hover:text-blue-500"
        >
          <EmployeesIcon class="mr-4 h-[40px] stroke-2 stoke-gray-500" />
          <br />
          <span class="text-xl font-bold mt-8">Posts</span>
        </RouterLink>
        <RouterLink
          to="human-resource/employees"
          class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72 hover:text-blue-500"
        >
          <EmployeesIcon class="mr-4 h-[40px] stroke-2 stoke-gray-500" />
          <br />
          <span class="text-xl font-bold mt-8">Users</span>
        </RouterLink>
        <RouterLink
          to="human-resource/employees"
          class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72 hover:text-blue-500"
        >
          <EmployeesIcon class="mr-4 h-[40px] stroke-2 stoke-gray-500" />
          <br />
          <span class="text-xl font-bold mt-8">Roles</span>
        </RouterLink>
      </div>
    </section>
    <section
      v-else-if="isHumanResource"
      class="w-full h-[85vh] mt-4 items-center justify-center space-x-8 md:flex lg:h-[75vh]"
    >
      <RouterLink
        to="human-resource/holiday-requests"
        class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 hover:bg-blue-100/10 inline-block md:w-72 md:h-72 hover:text-blue-500"
      >
        <ListIcon class="block mr-4 h-10 stroke-2 stoke-gray-500" />
        <br />
        <span class="text-xl font-bold mt-8">Holidays requests</span>
      </RouterLink>
      <RouterLink
        to="human-resource/employees"
        class="p-8 rounded-lg border flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72 hover:text-blue-500"
      >
        <EmployeesIcon class="mr-4 h-[40px] stroke-2 stoke-gray-500" />
        <br />
        <span class="text-xl font-bold mt-8">Employees</span>
      </RouterLink>
    </section>
    <section
      v-else
      class="text-center mx-auto px-4 flex flex-col justify-around lg:pb-0 lg:p-20"
    >
      <h1 class="font-bold text-3xl">Hello, welcome...</h1>
      <p class="text-gray-500 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis
        quasi dicta sed ipsum quas nihil, quis pariatur.
      </p>
      <div class="w-full md:flex justify-center gap-4 mt-4">
        <button
          title="Create new holiday"
          class="w-full shadow-blue-400 bg-blue-primary mb-4 text-left text-base text-white p-4 rounded-md font-bold md:text-center shadow-lg md:w-[248px] md:mb-0"
          @click.stop="toggleFormModal"
        >
          <span class="mr-2 py-1 px-2 bg-blue-400 rounded">
            <AddIcon class="fill-white" />
          </span>
          Create new holiday
        </button>
        <RouterLink
          to="/holiday-requests"
          class="w-full bg-blue-light shadow-lg shadow-blue-200 inline-block text-blue-500 text-left text-base p-4 rounded-md font-bold mb-4 md:mb-0 md:text-center md:w-[248px]"
        >
          <CalendarIcon class="inline align-middle mr-4" />
          Liste des conges
        </RouterLink>
      </div>
      <div class="w-full">
        <img
          src="@/assets/illustration-home.svg"
          alt="welcome"
          class="mx-auto w-full md:w-auto lg:w-2/5 2xl:w-3/4"
        />
      </div>
    </section>
  </div>
  <HolidayCreation v-if="isFormVisible" @close="toggleFormModal" />
</template>

<script setup lang="ts">
import AddIcon from "@/components/icons/AddIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
import HolidayCreation from "@/components/modals/HolidayCreation.vue";
import { ref, computed } from "vue";
import ListIcon from "@/components/icons/ListIcon.vue";
import EmployeesIcon from "@/components/icons/EmployeesIcon.vue";
import { userHasRole } from "@/utils/user";
import { useSessionStore } from "@/store/session";
import { Session } from "@/domain/Session";
import { USER_ROLE } from "@/utils/enum";

const isFormVisible = ref(false);

const toggleFormModal = () => {
  isFormVisible.value = !isFormVisible.value;
};

const session = ref<Session>(useSessionStore().session);
const isAdmin = computed(() =>
  userHasRole(USER_ROLE.ADMIN, session.value.roles)
);
const isHumanResource = computed(() =>
  userHasRole(USER_ROLE.HUMAN_RESOURCE, session.value.roles)
);
</script>
