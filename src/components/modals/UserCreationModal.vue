<template>
  <ModalWrapper @close="$emit('close')">
    <form
      data-test="post-creation-form"
      @submit.prevent="create"
      class="w-[35rem] border rounded-xl p-6 shadow-lg bg-white"
    >
      <div>
        <h2 class="text-2xl font-bold text-center mb-4" data-test="form-title">
          New User
        </h2>
      </div>
      <TextField
        class="mt-2"
        label="Firstname *"
        data-test="holiday-type"
        placeholder="Enter the firstname here"
        v-model="user.firstName"
        :error="error.title"
      />
      <TextField
        class="mt-2"
        label="Lastname"
        data-test="holiday-type"
        placeholder="Enter the lastname here"
        v-model="user.lastName"
        :error="error.title"
      />
      <TextField
        class="mt-2"
        label="Email *"
        data-test="holiday-type"
        placeholder="Enter the email address here"
        v-model="user.email"
        :error="error.title"
      />
      <div class="mt-2 mb-4">
        <p class="py-2 font-semibold text-gray-700">Roles</p>
        <div class="flex space-x-6 items-center">
          <CheckBox v-model="roles" label="Admin" />
          <CheckBox v-model="roles" label="Human ressources" />
          <CheckBox v-model="roles" label="Employee" />
        </div>
      </div>
      <TextField
        label="Password *"
        type="password"
        data-test="holiday-type"
        placeholder="Enter the password here"
        v-model="user.password"
        :error="error.title"
      />
      <div class="grid md:grid-cols-2 mt-4 gap-x-4">
        <BaseButton
          @click="$emit('close')"
          title="cancel"
          data-test="submit-button"
          class="w-full shadow-none text-base mt-4 hover:shadow-md bg-blue-100 font-semibold text-gray-700 md:mt-0"
        />
        <BaseButton
          title="Create"
          :disabled="!shouldCreationButtonEnable"
          data-test="submit-button"
          @click="create"
          :class="[
            'w-full shadow-none text-base mt-4 font-semibold md:mt-0',
            shouldCreationButtonEnable
              ? 'bg-blue-primary/100 hover:shadow-blue-primary hover:shadow-md cursor-pointer'
              : ' bg-blue-primary/40 cursor-not-allowed',
          ]"
        />
      </div>
    </form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import TextField from "@/components/forms/TextField.vue";
import { reactive, computed, ref } from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import { HolidayErrors } from "@/utils/type";
import CheckBox from "../forms/CheckBox.vue";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

enum ROLES {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  HUMAN_RESOURCE = "HUMAN_RESOURCE",
}
const roles = Object.keys(ROLES).map((role) => role.toLowerCase());

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
});

const isProcessing = ref<boolean>(false);

const shouldCreationButtonEnable = computed(
  () =>
    !!user.firstName && !!user.email && !!user.password && !isProcessing.value
);
const error = reactive<HolidayErrors>({
  title: "",
  description: "",
  service: "",
});

const create = () => {
  emit("created");
};
const close = (): void => {
  emit("close");
};
</script>
