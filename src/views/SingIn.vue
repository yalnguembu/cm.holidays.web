<template>
  <main class="p-5">
    <CardWrapper>
      <form @submit.prevent="login" autocomplete="on">
        <div class="md:text-center mb-8">
          <h1 class="font-bold text-3xl">Login</h1>
          <p class="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          </p>
        </div>
        <ErrorAlert v-if="error.crudentials" :title="error.crudentials" />
        <br />
        <EmailInput
          label="Email"
          placeholder="Enter your email"
          v-model="email"
          :error="error.email"
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          v-model="password"
          :error="error.password"
        />
        <div class="flex flex-row align-center justify-between mt-6">
          <CheckBox
            v-model="remember"
            label="Remember me!"
          />
          <router-link to="/forgot" class="underline text-blue-500">
            Forgot password?
          </router-link>
        </div>
        <BaseButton title="LOGIN" type="submit" class="w-full mt-8" />
      </form>
    </CardWrapper>
  </main>
</template>

<script>
import PasswordInput from "../components/PasswordInput.vue";
import EmailInput from "../components/EmailInput.vue";
import BaseButton from "../components/BaseButton.vue";
import CardWrapper from "../components/CardWrapper.vue";
import ErrorAlert from "../components/ErrorAlert.vue";
import CheckBox from "../components/CheckBox.vue";

export default {
  name: "SingIn",

  components: {
    PasswordInput,
    EmailInput,
    BaseButton,
    CardWrapper,
    ErrorAlert,
    CheckBox,
  },

  data() {
    return {
      email: "",
      password: "",
      remember: false,
      error: {
        email: "",
        password: "",
        crudentials: "",
      },
    };
  },

  methods: {
    showError(error) {
      console.log(error);
    },
    checkEmail() {
      if (this.email) this.error.email = "";
      else this.error.email = "This field is required";
    },

    checkPassord() {
      if (this.password) this.error.password = "";
      else this.error.password = "This field is required";
    },

    checkForm() {
      this.checkEmail();
      this.checkPassord();
      return this.error.email.length === 0 && this.error.password.length === 0;
    },

    saveInTheStorage() {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: this.email,
        })
      );
    },

    saveInTheSession() {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: this.email,
        })
      );
    },

    getUsers() {
      return JSON.parse(localStorage.getItem("users"));
    },

    findUser() {
      return this.getUsers().find(
        (user) => user.email === this.email && user.password === this.password
      );
    },

    login() {
      if (this.checkForm()) {
        if (this.findUser()) {
          this.remember ? this.saveInTheStorage() : this.saveInTheSession();
          this.$router.push("/");
        } else this.error.crudentials = "Incorrect email or password";
      }
    },
  },

  watch: {
    email() {
      this.checkEmail();
    },

    password() {
      this.checkPassord();
    },
  },
};
</script>
