<template>
  <div class="w-full h-[80vh] flex items-center justify-center">
    <CardWrapper class="border-gray-100">
      <form @submit.prevent="login" autocomplete="on">
        <div class="md:text-center mb-2">
          <h1 class="font-bold text-3xl text-blue-800 mb-4">Login</h1>
          <p class="text-gray-500 px-12">
            Nous somme content de vous revoir, veillez entrez vos informations pour
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
            class="mt-4"
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
        <BaseButton title="LOGIN" type="submit" class="w-full mt-8 bg-blue-primary text-white" />
      </form>
    </CardWrapper>
  </div>
</template>
<script setup lang="ts">
import PasswordInput from "@/components/forms/PasswordInput.vue";
import EmailInput from "@/components/forms/EmailInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardWrapper from "@/components/CardWrapper.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import CheckBox from "@/components/forms/CheckBox.vue";
import { reactive, ref, watch } from "vue";
import { Router, useRouter } from "vue-router";
import { User } from "../../utils/types";
import {useSessionStore} from "@/store/session";
import { Credential } from "@/domain/Credential"
import { ResquestStatus } from "@/utils/api";

const router: Router = useRouter();

const email = ref("");
const password = ref("");
const remember = ref(false);
const error = reactive({
  email: "",
  password: "",
  crudentials: ""
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

const login = async () => {
  if (!checkForm()) return
  const credential = new Credential({
    email : email.value,
    password: password.value
  })
  const loginRequest = await useSessionStore().login(credential);
  if (loginRequest.status === ResquestStatus.SUCCESS)  await router.push("/")
  else error.crudentials = "error occured please retry"
};

watch(email, () => {
  checkEmail();
});
watch(password, () => {
  checkPassord();
});
</script>
