<template>
  <div
    class="w-full min-h-[80vh] overflow-y-auto flex flex-col items-center justify-center"
  >
    <img
      alt="LAO logo"
      title="LAO logo"
      src="@/assets/logo.svg"
      class="w-32 mb-4"
    />
    <CardWrapper class="border-gray-100 p-4 bg-blue-50/50">
      <form @submit.prevent="login" autocomplete="on">
        <div class="text-center mb-2">
          <h1 class="font-bold text-3xl text-blue-800 mb-4">Login</h1>
          <p class="text-gray-500 px-12">
            Nous somme content de vous revoir, veillez entrez vos informations
            pour continuer
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
        <BaseButton
          :disabled="isLoading || !areEmilAndPasswordValid"
          :title="isLoading ? 'Loging...' : 'LOGIN'"
          type="submit"
          :class="[
            'w-full mt-8',
            isLoading || !areEmilAndPasswordValid
              ? 'bg-blue-primary/30 cursor-not-allowed'
              : 'bg-blue-primary text-white cursor-pointer',
          ]"
        />
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
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/store/session";
import { Credential } from "@/domain/Credential";
import { RequestsStatus } from "@/utils/api";

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

const areEmilAndPasswordValid = computed(
  (): boolean => error.email.length === 0 && error.password.length === 0
);
const isLoading = ref<boolean>(false);
const login = async () => {
  isLoading.value = true;
  checkEmail();
  checkPassord();

  if (!areEmilAndPasswordValid.value) {
    isLoading.value = false;
    return;
  }
  console.log("1");

  const credential = new Credential({
    email: email.value,
    password: password.value,
  });

  console.log("2");

  const signInResponse = await useSessionStore().login(credential);

  console.log("3");

  if (signInResponse.status === RequestsStatus.SUCCESS)
    window.location.href = "/";
  else
    error.crudentials =
      signInResponse.error?.message ?? "error occured please retry";

  password.value = "";
  isLoading.value = false;
};

watch(email, () => {
  checkEmail();
});
watch(password, () => {
  checkPassord();
});
</script>
