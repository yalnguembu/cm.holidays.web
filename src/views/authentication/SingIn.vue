<template>
  <div
    v-if="isForwarding"
    class="h-screen w-full backdrop-blur-sm bg-white/30 absolute top-0 left-0 flex items-center justify-center"
  >
    <SpinnerLoader />
  </div>
  <div
    v-else
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
            We are happy to see you again, please enter your details
            to continue
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
          :title="isLoading ? 'Logging...' : 'LOGIN'"
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
import { useSessionStore } from "@/store/session";
import { Credential } from "@/domain/Credential";
import { RequestsStatus } from "@/utils/api";
import { useRouter } from "vue-router";
import SpinnerLoader from "@/components/SpinnerLoader.vue";

const email = ref("");
const password = ref("");
const remember = ref(false);

type Login = {
  email: string;
  password: string;
  crudentials: string;
}
const error = reactive<Login>({
  email: "",
  password: "",
  crudentials: "",
});

const checkEmail = () => {
  if (email.value) error.email = "";
  else error.email = "This field is required";
};
const checkPassword = () => {
  if (password.value) error.password = "";
  else error.password = "This field is required";
};

const areEmilAndPasswordValid = computed(
  (): boolean => error.email.length === 0 && error.password.length === 0
);

const router = useRouter();
const isLoading = ref<boolean>(false);

const isForwarding = ref<boolean>(false);
const login = async (): Promise<void> => {
  isLoading.value = true;
  checkEmail();
  checkPassword();

  if (!areEmilAndPasswordValid.value) {
    isLoading.value = false;
    return;
  }

  const credential = new Credential({
    email: email.value,
    password: password.value,
  });

  const signInResponse = await useSessionStore().login(credential);

  if (signInResponse.status === RequestsStatus.SUCCESS) {
    isForwarding.value = true;
    await router.push("/");
  }
  else
    error.crudentials =
      signInResponse.error?.message ?? "error occurred please retry";

  password.value = "";
  isLoading.value = false;
};

watch(email, () => {
  checkEmail();
});
watch(password, () => {
  checkPassword();
});
</script>
