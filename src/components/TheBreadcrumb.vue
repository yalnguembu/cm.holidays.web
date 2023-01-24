<template>
  <h1 class="my-4">
    <RouterLink to="/" data-test="breadcrumb-link">
      <span class="align-middle align-middle mr-2 text-gray-500 text-lg">
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
        <span class="text-gray-500 mr-2 align-middle text-lg">
          {{ route }}</span
        >
      </RouterLink>
      <span
        v-else
        class="font-bold mr-2 text-2xl align-middle text-black"
        data-test="last-item"
      >
        {{ isHolidayDetailsPage ? `holiday details` : route }}
      </span>
      <ArrowRigthIcon
        v-if="isNotTheLast(index)"
        class="mr-2 align-middle"
        data-test="arrow-right"
      />
    </template>
  </h1>
</template>

<script>
import ArrowRigthIcon from "./icons/ArrowRigthIcon.vue";

export default {
  components: {
    ArrowRigthIcon,
  },

  data() {
    return {
      currentPath: this.$route.path,
    };
  },

  methods: {
    isNotTheLast(route) {
      return route < this.routes.length - 1;
    },
  },

  computed: {
    routes() {
      return this.currentPath.split("/").splice(1);
    },

    isHolidayDetailsPage() {
      return this.$route.params.id ? true : false;
    },
  },
};
</script>
