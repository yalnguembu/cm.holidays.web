<template>
  <div>
    <div
      class="w-full flex items-center justify-between p-4 px-8 border bg-white shadow-md md:p-5 md:px-12"
    >
      <div>
        <h2 class="text-2xl font-bold">Holidays</h2>
      </div>
      <div class="relative">
        <button class="flex items-center" @click="toogleIsAccountMenuVisible">
          <AccountIcon class="cursor-pointer h-8 w-8" />
          <span class="font-bold text-base ml-2 text-gray-500">Jhon Doe</span>
        </button>
        <UserProfile
          class="absolute top-10 -right-5"
          v-if="isAccountMenuVisible"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AccountIcon from "./icons/AccountIcon.vue";
import UserProfile from "./UserProfile.vue";

const isAccountMenuVisible = ref<boolean>(false);

const toogleIsAccountMenuVisible = () =>
  (isAccountMenuVisible.value = !isAccountMenuVisible.value);
</script>
