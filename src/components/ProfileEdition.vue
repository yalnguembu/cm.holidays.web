<template>
  <form
      data-test="post-creation-form"
      @submit.prevent="create"
      class="w-full bg-white pt-2"
  >
    <div>
      <h2 class="text-2xl font-bold text-center mb-6" data-test="form-title">
        Edit profile
      </h2>
    </div>
    <TextField
        class="mt-2"
        label="Firstname"
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
    <div class="grid md:grid-cols-2 mt-4 gap-x-4 mb-2">
      <BaseButton
          @click="$emit('close')"
          title="cancel"
          data-test="submit-button"
          class="w-full shadow-none text-base mt-4 hover:shadow-md bg-blue-100 font-semibold text-gray-700 md:mt-0 bg-gray-300 "
      />
      <BaseButton
          title="Save"
          :disabled="!shouldCreationButtonEnable"
          data-test="submit-button"
          @click="create"
          :class="[
              'w-full text-base mt-4 font-semibold md:mt-0',
              shouldCreationButtonEnable ? 'bg-blue-primary/100 hover:shadow-blue-primary hover:shadow-md cursor-pointer':' bg-blue-primary/40 cursor-not-allowed shadow-none'
          ]"
      />
    </div>
  </form>
</template>
<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import TextField from "@/components/forms/TextField.vue";
import SelectInput from "@/components/forms/SelectInput.vue";
import { reactive, computed, ref } from "vue";
import { HolidayErrors } from "@/utils/type";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

enum ROLES {
  ADMIN = "ADMIN",
  EMPLOYEE= "EMPLOYEE",
  HUMAN_RESOURCE ="HUMAN_RESOURCE"
}
const roles = Object.keys(ROLES).map((role)=> role.toLowerCase())

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
});

const isProcessing = ref<boolean>(false);

const shouldCreationButtonEnable = computed(()=> !!user.firstName && !!user.email && !!user.password && !isProcessing.value)
const error = reactive<HolidayErrors>({
  title: "",
  description: "",
  service: "",
});

const create = () => {
  emit("created")
};
const close = (): void => {
  emit("close");
};
</script>
