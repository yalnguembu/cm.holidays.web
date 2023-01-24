<template>
  <template v-if="isUserConnected()">
    <TheMainNavbar />
    <RouterView />
  </template>
</template>

<script>
import TheMainNavbar from "./TheMainNavbar.vue";
export default {
  name: "MainWrapper",
  components: { TheMainNavbar },
  methods: {
    filteredUser(userSession) {
      const users = JSON.parse(localStorage.getItem("users"));
      return users.filter((user) => user.email === userSession.email);
    },

    isUserConnected() {
      const userSession =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return (
        userSession && this.filteredUser(JSON.parse(userSession)).length > 0
      );
    },
  },

  mounted() {
    !this.isUserConnected() && this.$router.push("/login");
  },
};
</script>
