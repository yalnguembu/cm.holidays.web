<template>
  <div class="h-screen w-screen">
    <TheMainNavbar
      :user="sessionStore.session"
      :items="
        sessionStore.session.isNull
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
import { userHasRole } from "@/utils/user";
import { useSessionStore } from "@/store/session";
import { Role } from "@/domain/Role";

const sessionStore = useSessionStore();
const isAdmin = computed(() =>
  userHasRole(USER_ROLE.ADMIN, sessionStore.session.roles as Role[])
);
const isHumanResource = computed(() =>
  userHasRole(USER_ROLE.HUMAN_RESOURCE, sessionStore.session.roles as Role[])
);
</script>
