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
          <CheckBox v-model="remember" label="Remember me!" />
          <router-link to="/forgot" class="underline text-blue-500">
            Forgot password?
          </router-link>
        </div>
        <BaseButton title="LOGIN" type="submit" class="w-full mt-8" />
      </form>
    </CardWrapper>
  </main>
</template>

<script setup lang="ts">
import PasswordInput from "../components/PasswordInput.vue";
import EmailInput from "../components/EmailInput.vue";
import BaseButton from "../components/BaseButton.vue";
import CardWrapper from "../components/CardWrapper.vue";
import ErrorAlert from "../components/ErrorAlert.vue";
import CheckBox from "../components/CheckBox.vue";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(false);
const error = reactive({
  email: "",
  password: "",
  crudentials: "",
});

const checkEmail = () => {
  if (email.value) error.email = "";
  else error.email = "This field is required";
};
const checkPassord = () => {
  if (password.value) error.password = "";
  else error.password = "This field is required";
};
const checkForm = () => {
  checkEmail();
  checkPassord();
  return error.email.length === 0 && error.password.length === 0;
};
const saveInTheStorage = () => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      email: email.value,
    })
  );
};
const saveInTheSession = () => {
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      email: email.value,
    })
  );
};
const getUsers = () => {
  return JSON.parse(localStorage.getItem("users") ?? "") ?? [];
};
const findUser = () => {
  return getUsers().find(
    (user: { email: string; password: string }) =>
      user.email === email.value && user.password === password.value
  );
};

const login = () => {
  if (checkForm()) {
    if (findUser()) {
      remember ? saveInTheStorage() : saveInTheSession();
      router.push("/");
    } else error.crudentials = "Incorrect email or password";
  }
};

watch(email, () => {
  checkEmail();
});
watch(password, () => {
  checkPassord();
});
</script>
