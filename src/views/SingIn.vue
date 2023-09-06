<template>
  <main class="p-5">
    <CardWrapper>
      <form @submit.prevent="login" autocomplete="on">
        <div class="md:text-center mb-8">
          <h1 class="font-bold text-3xl">Login</h1>
          <p class="text-gray-500">
            Nous somme content de vous revoir, entrez vos informations pour
            continuer
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
          <RouterLink to="/forgot" class="underline text-blue-500">
            Forgot password?
          </RouterLink>
        </div>
        <BaseButton title="LOGIN" type="submit" class="w-full mt-8" />
      </form>
    </CardWrapper>
  </main>
</template>

<script setup lang="ts">
import PasswordInput from "@/components/form/PasswordInput.vue";
import EmailInput from "@/components/form/EmailInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardWrapper from "@/components/CardWrapper.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import { reactive, ref, watch } from "vue";
import { Router, useRouter } from "vue-router";
import { User } from "../utils/types";

const router: Router = useRouter();

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
const checkForm = (): boolean => {
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
const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") ?? "[]");
};
const findUser = (): User => {
  return (
    getUsers().find(
      (user) => user.email === email.value && user.password === password.value
    ) ?? ({} as User)
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
