<template>
  <div class="w-full p-5">
    <form
      @submit.prevent="login"
      class="md:shadow-lg md:border md:bg-white md:p-5 lg:p-8 rounded-lg md:w-1/2 mx-auto md:mt-8 xl:w-1/3"
    >
      <div class="md:text-center mb-8">
        <h1 class="font-bold text-2xl">Resset password</h1>
        <p class="text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        </p>
      </div>
      <div class="mt-4">
        <label for="password" class="text-gray-500">password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="border border-gray-300 rounded-lg shadow-2xl flex flex-row w-full justify-between align-center mt-2 p-4"
          placeholder="Enter your password"
          v-model="user.password"
        />
      </div>
      <div class="mt-4">
        <label for="password" class="text-gray-500">confirm password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="border border-gray-300 rounded-lg shadow-2xl flex flex-row w-full justify-between align-center mt-2 p-4"
          placeholder="Enter your password again"
          v-model="user.confirmPassword"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white w-full text-center p-4 rounded-md font-bold mt-8 text-xl shadow-xl shadow-blue-400 mb-4"
      >
        SAVE
      </button>
      <p
        class="text-red-500 text-center font-bold"
        v-show="isErrorMessageVisible"
      >
        incorrect email or password
      </p>
    </form>
  </div>
</template>

<script>
import Lock from "../components/icons/LockIcon.vue";

export default {
  name: "Login",
  mounted() {
    this.$refs.mailRef.focus();
  },
  data() {
    return {
      user: {
        confirmPassword: "",
        password: "",
      },
      isErrorMessageVisible: false,
    };
  },
  methods: {
    login() {
      console.log(this.user);
      this.isErrorMessageVisible = !this.isErrorMessageVisible;
    },
  },
  components: {
    Lock,
  },
};
</script>
