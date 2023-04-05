<template>
  <div
    class="w-full flex items-center justify-between p-4 border bg-white shadow-md lg:px-20"
  >
    <div>
      <h2 class="text-2xl font-bold mt-3.5">Logo</h2>
      <h6 class="text-gray-500">{{ date }}</h6>
    </div>
    <div>
      <AccountIcon class="cursor-pointer mt-3.5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import AccountIcon from "./icons/AccountIcon.vue";

const date = computed(() => {
  return new Date().toLocaleDateString("fr-fr", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
