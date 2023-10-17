<template>
  <div class="w-96 bg-white shadow-lg rounded overflow-hidden p-5 lg:border z-20">
    <EditProfile
      @close="toggleEditionFormVisibility"
      :profile="profile"
      v-if="isEditFormVisivle"
    />
    <div v-else>
      <div class="flex justify-between">
        <h2 class="font-bold text-2xl text-gray-700">Profile</h2>
        <button
          @click="toggleEditionFormVisibility"
          class="p-2 h-fit border-2 border-transparent font-bold text-gray-500 transition hover:shadow duration-500 hover:border-blue-primary hover:text-blue-primary rounded"
        >
          <EditIcon />
        </button>
      </div>
      <div class="mt-8">
        <div class="flex items-end">
          <AccountIcon class="cursor-pointer h-20 w-20" />
          <div class="ml-6">
            <p class="font-bold text-xl ml-2 text-blue-primary">
              {{ profile.name }}
            </p>
            <p class="text-base ml-2 text-gray-500">{{ profile.email }}</p>
          </div>
        </div>
        <div class="border-t p-4 text-center w-full mt-8">
          <p class="text-gray-500">
            since {{ dateToLocalString(profile.joinedDate) }}
          </p>
          <p class="text-gray-500 mt-4">
            <span class="font-semibold mr-1 text-gray-700">
              <span class="text-blue-primary"> 10</span> / 15
            </span>
            days of holiday this year
          </p>
        </div>

        <button
          type="button"
          class="border-t p-4 text-center w-full mt-4 text-gray-500 hover:bg-gray-100"
        >
          <LogoutIcon class="w-9 h-9" />
          <span class="ml-4 text-lg">Log Out</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import AccountIcon from "./icons/AccountIcon.vue";
import EditIcon from "./icons/PencilIcon.vue";
import LogoutIcon from "./icons/LogoutIcon.vue";
import EditProfile from "./EditProfile.vue";
import { dateToLocalString } from "@/utils/date";

const isEditFormVisivle = ref<boolean>(false);
const toggleEditionFormVisibility = () =>
  (isEditFormVisivle.value = !isEditFormVisivle.value);

const profile = {
  name: "Jhon Doe",
  email: "jhon.doe@mail.com",
  picture: "",
  joinedDate: "2023-03-23",
};
</script>
