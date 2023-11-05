<template>
  <template v-if="isUserConnected()">
    <TheMainNavbar />
    <RouterView />
  </template>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { Router, useRouter } from "vue-router";
import TheMainNavbar from "./TheMainNavbar.vue";

interface User {
  email: string;
}

const router: Router = useRouter();
const filteredUser = (userSession: User): User[] => {
  const users = JSON.parse(localStorage.getItem("users") ?? "");
  return users.filter((user: User) => user.email === userSession.email);
};
const isUserConnected = (): boolean => {
  const userSession =
    (localStorage.getItem("user") ?? "") ||
    (sessionStorage.getItem("user") ?? "");
  return 1;
};

onMounted(() => {
  // !isUserConnected() && router.push("/login");
});
</script>
