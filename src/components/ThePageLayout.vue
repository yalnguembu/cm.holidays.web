<template>
  <div class="h-screen w-screen">
    <TheMainNavbar
      :user="session"
      :items="
        session.isNull
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
import { computed, ref } from "vue";
import {
  adminNavBarItems,
  humanResourceNavBarItems,
  clientNavBarItems,
} from "@/utils/menu";
import { userHasRole } from "@/utils/user";
import { useSessionStore } from "@/store/session";
import { Session } from "@/domain/Session";

const session = ref<Session>(useSessionStore().session);
const isAdmin = computed(() =>
  userHasRole(USER_ROLE.ADMIN, session.value.roles)
);
const isHumanResource = computed(() =>
  userHasRole(USER_ROLE.HUMAN_RESOURCE, session.value.roles)
);
</script>
