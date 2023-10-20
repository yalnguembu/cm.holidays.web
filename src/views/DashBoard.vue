<template>
  <div
    class="container h-full w-full text-center px-4 flex justify-between items-center"
  >
    <section v-if="false" class="h-[70vh] w-full max-w-screen-xl mx-auto text-center px-4 flex center items-center">
      <div class="w-full h-fit mt-4 space-x-8 grid grid-cols-4 items-center justify-center">
        <DashboardButton v-for="option in adminOptions" :icon="option.icon" :label="option.label" :path="option.path" />
      </div>
    </section>
    <section v-else-if="true" class="w-full h-[85vh] mt-4 items-center justify-center space-x-8 md:flex lg:h-[75vh]">
      <div class="w-full h-fit mt-4 grid justify-items-center">
        <DashboardButton v-for="option in humanResourceOptions" :icon="option.icon" :label="option.label" :path="option.path" />
      </div>
    </section>
    <section v-else class="container text-center px-4 flex flex-col justify-around lg:pb-0 lg:p-20">
      <h1 class="font-bold text-3xl">Hello, welcome...</h1>
      <p class="text-gray-500 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis
        quasi dicta sed ipsum quas nihil, quis pariatur.
      </p>
      <div class="w-full md:flex justify-center gap-4 mt-4">
        <button
            title="Create new holiday"
            class="w-full shadow-xl shadow-blue-400 bg-blue-primary mb-4 text-left text-base text-white p-4 rounded-md font-bold md:text-center shadow-lg md:w-[248px] md:mb-0"
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
import {userHasRole} from "@/utils/user";
import {useSessionStore} from "@/store/session";
import {Session} from "@/domain/Session";
import {USER_ROLE} from "@/utils/enum";
import PostIcon from "@/components/icons/PostIcon.vue";
import SettingIcon from "@/components/icons/SettingIcon.vue";
import DashboardButton from "@/components/DashboardButton.vue";

const isFormVisible = ref(false);

const toggleFormModal = () => {
  isFormVisible.value = !isFormVisible.value;
};


const session = ref<Session>( useSessionStore().session);
const isAdmin = computed(() => userHasRole(USER_ROLE.ADMIN, session.value.roles));
const isHumanResource = computed(() => userHasRole(USER_ROLE.HUMAN_RESOURCE, session.value.roles));

const adminOptions = [
  {
    label: "Services",
    path: "/admin/services",
    icon: ListIcon,
    title: "Go to services list"
  },
  {
    label: "Posts",
    path: "admin/posts",
    icon: PostIcon,
    title: "Go to posts list"
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: EmployeesIcon,
    title: "Go to users list"
  },
  {
    label: "Roles",
    path: "/admin/users",
    icon: SettingIcon,
    title: "Go to roles list"
  },
];

const humanResourceOptions = [
  {
    label: "Holidays requests",
    path: "human-resource/holiday-requests",
    icon: ListIcon,
    title: "Go to holiday requests list"
  },
  {
    label: "Employees",
    path: "human-resource/employees",
    icon: EmployeesIcon,
    title: "Go to employees list"
  },
]
</script>
