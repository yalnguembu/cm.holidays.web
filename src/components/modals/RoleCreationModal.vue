<template>
  <ModalWrapper @close="$emit('close')">
    <form
      data-test="role-creation-form"
      class="w-92 border rounded-xl p-6 shadow-lg bg-white"
    >
      <div>
        <h2 class="text-2xl font-bold text-center mb-4" data-test="form-title">
          New role
        </h2>
      </div>
      <TextField
          data-test="holiday-type"
          v-model="role.type"
          label="Title"
          placeholder="Enter the title"
          class="mt-3"
      />
      <TextArea
          v-model="role.description"
          :error="error.description"
          class="mt-4"
          label="Description"
          placeholder="Enter the description"
      />
      <div class="grid md:grid-cols-2 mt-3 gap-x-4">
        <BaseButton
            class="w-full shadow-none text-base mt-4 hover:shadow-md bg-blue-100 font-semibold text-gray-700 md:mt-0"
            data-test="submit-button"
            title="cancel"
            @click="$emit('close')"
        />
        <BaseButton
            :class="['w-full shadow-none text-base mt-4 font-semibold md:mt-0 bg-blue-primary/40 cursor-not-allowed', {'bg-blue-primary/100 hover:shadow-blue-primary hover:shadow-md cursor-pointer':shouldCreationButtonEnable} ]"
            :disabled="!shouldCreationButtonEnable"
            data-test="submit-button"
            title="Create"
            @click="create"
        />
      </div>
    </form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import BaseButton from "../BaseButton.vue";
import TextArea from "@/components/forms/TextArea.vue";
import TextField from "@/components/forms/TextField.vue";
import {reactive, ref, watchEffect} from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import {Role} from "@/domain/Role";
import { useRoleStore} from "@/store/role";
import {computed} from "@vue/runtime-core";
import SelectInput from "@/components/forms/SelectInput.vue";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

interface roleType{
  type: string,
  description: string,
}
const role = reactive<roleType>({
  type: "",
  description: "",
});

const error = reactive<roleType>({
  type: "",
  description: "",
});

const isProcessing = ref<boolean>(false);
const shouldCreationButtonEnable = computed(()=> !!role.type && !isProcessing.value);

enum ROLES {
  ADMIN = "ADMIN",
  EMPLOYEE= "EMPLOYEE",
  HUMAN_RESOURCE ="HUMAN_RESOURCE"
}

const roles = Object.keys(ROLES).map((role)=> role.toLowerCase())
const create = async () => {
  isProcessing.value = true;
  const newRole = new Role(role)
  await useRoleStore().createRole(newRole);
  isProcessing.value = false;
  emit('created');
};
const close = (): void => {
  emit("close");
};
</script>
