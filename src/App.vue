<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  created() {
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
  },
};
</script>
