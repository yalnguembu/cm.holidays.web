<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  localStorage.setItem(
    "users",
    JSON.stringify([
      {
        id: 0,
        email: "user@lao-sarl.cm",
        password: "1234",
      },

      {
        id: 1,
        email: "yal@lao-sarl.cm",
        password: "1234",
      },
    ])
  );
});
</script>
