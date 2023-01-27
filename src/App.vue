<template>
  <router-view />
</template>

<script setup>
import { onBeforeUnmount } from "vue";

onBeforeUnmount(() => {
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
