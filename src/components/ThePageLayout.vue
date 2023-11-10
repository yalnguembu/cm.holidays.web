<template>
  <div class="h-screen w-screen">
    <TheMainNavbar
      :user="useSessionStore().session"
      :items="
        useSessionStore().session.isNull
          ? []
          : isAdmin
          ? adminNavBarItems
          : isHumanResource
          ? humanResourceNavBarItems
          : clientNavBarItems
      "
    />
    <main class="flex flex-col items-center">
      <div
        class="w-full h-max p-4 md lg:max-w-screen-xl xl:max-w-screen-2xl lg:px-8"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TheMainNavbar from "./TheMainNavbar.vue";
import { USER_ROLE } from "@/utils/enum";
import { computed } from "vue";
import {
  adminNavBarItems,
  humanResourceNavBarItems,
  clientNavBarItems,
} from "@/utils/menu";
import { useSessionStore } from "@/store/session";

const isAdmin = computed((): boolean => useSessionStore().activeRole?.type === USER_ROLE.ADMIN);
const isHumanResource = computed((): boolean => useSessionStore().activeRole?.type === USER_ROLE.HUMAN_RESOURCE);
</script>
