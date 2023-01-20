<template>
  <h1 class="my-4">
    <RouterLink to="/" data-test="link">
      <span class="align-middle mr-2 text-gray-500 align-middle text-lg">
        Home
      </span>
    </RouterLink>
    <ArrowRigthIcon class="mr-2 align-middle" data-test="arrow-right" />
    <template v-for="(route, index) in routes" :key="index">
      <RouterLink
        data-test="link"
        :to="`/${route}`"
        v-if="isLast(index)"
        class="text-gray-500 mr-2 align-middle text-lg"
      >
        {{ route }}
      </RouterLink>
      <span
        v-else
        class="font-bold mr-2 text-2xl align-middle"
        data-test="last-item"
      >
        {{ isHolidayDetailsPage ? `holiday details` : route }}
      </span>
      <ArrowRigthIcon
        v-if="isLast(index)"
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
    isLast(route) {
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
