<template>
  <h1 class="my-4">
    <RouterLink to="/" data-test="breadcrumb-link">
      <span
        class="align-middle align-middle mr-2 text-gray-500 text-base hover:text-blue-500"
      >
        Home
      </span>
    </RouterLink>
    <ArrowRigthIcon class="mr-2 align-middle" data-test="arrow-right" />
    <template v-for="(route, index) in routes" :key="index">
      <RouterLink
        data-test="breadcrumb-link"
        :to="`/${route}`"
        v-if="isNotTheLast(index)"
      >
        <span class="text-gray-500 text-base mr-2 align-middle">
          {{ formatUrl(route) }}</span
        >
      </RouterLink>
      <span
        v-else
        class="align-middle mr-2 text-black text-lg font-bold"
        data-test="last-item"
      >
        {{ isHolidayDetailsPage ? `Holiday Details` : formatUrl(route) }}
      </span>
      <ArrowRigthIcon
        v-if="isNotTheLast(index)"
        class="mr-2 align-middle"
        data-test="arrow-right"
      />
    </template>
  </h1>
</template>

<script setup lang="ts">
import ArrowRigthIcon from "./icons/ArrowRigthIcon.vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
import { formatUrl } from "@/utils/string";

const route: RouteLocationNormalizedLoaded = useRoute();

const isNotTheLast = (index: number): boolean => {
  return index < routes.value.length - 1;
};

const routes = computed<string[]>(() => {
  return route.path.split("/").splice(1);
});
const isHolidayDetailsPage = computed<boolean>(() => {
  return route.params.id ? true : false;
});
</script>
