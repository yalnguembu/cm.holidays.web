<template>
  <AuthenticationNavbar />
  <RouterView />
</template>
<script>
import AuthenticationNavbar from "./AuthenticationNavbar.vue";
export default {
  name: "Authentication",
  components: { AuthenticationNavbar },
};
</script>
