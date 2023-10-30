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
      <SelectInput
        class="mt-2"
        label="Post"
        placeholder="Select a post"
        :isLoading="isLoadingPost"
        :options="postOptions"
        v-model="user.post"
      />
      <div class="mb-4">
        <p class="pb-2 font-semibold text-gray-700">Roles</p>
        <div class="flex space-x-5 items-center">
          <CheckBox
            v-for="role in fetchedRoles"
            :key="role.id"
            v-model="user.roles"
            :label="role.type.toLowerCase()"
            :value="role"
          />
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
          :title="isLoading ? 'Creating...' : 'Create'"
          :disabled="!shouldCreationButtonEnable"
          data-test="submit-button"
          @click="create"
          :class="[
            'w-full shadow-none text-base mt-4 font-semibold md:mt-0',
            shouldCreationButtonEnable
              ? 'bg-blue-primary/100 hover:shadow-blue-primary text-white hover:shadow-md cursor-pointer'
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
import { computed, onBeforeMount, reactive, ref } from "vue";
import ModalWrapper from "../modals/ModalWrapper.vue";
import { HolidayErrors } from "@/utils/type";
import CheckBox from "../forms/CheckBox.vue";
import { Employee } from "@/domain/Employee";
import { useEmployeeStore } from "@/store/employee";
import { RequestsStatus } from "@/utils/api";
import { newNullPost, Post } from "@/domain/Post";
import { PostOptionItem } from "@/utils/options";
import { usePostStore } from "@/store/post";
import SelectInput from "@/components/forms/SelectInput.vue";
import { useRoleStore } from "@/store/role";
import { Role } from "@/domain/Role";

const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
  password: "",
  post: new PostOptionItem(newNullPost()),
});

const isLoading = ref<boolean>(false);

const shouldCreationButtonEnable = computed(
  () => !!user.firstName && !!user.email && !!user.password && !isLoading.value
);
const error = reactive<HolidayErrors>({
  title: "",
  description: "",
  post: "",
});

const isLoadingPost = ref<boolean>(false);

const fetchedPosts = ref<Post[]>([]);
const postOptions = computed((): PostOptionItem[] =>
  fetchedPosts.value.map((post) => new PostOptionItem(post))
);

const fetchServices = async (): Promise<void> => {
  isLoadingPost.value = true;
  const apiResponse = await usePostStore().getAllPosts();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    fetchedPosts.value = apiResponse.data ?? [];
  isLoadingPost.value = false;
};

const fetchedRoles = ref<Role[]>([]);
const fetchRoles = async (): Promise<void> => {
  isLoadingPost.value = true;
  const apiResponse = await useRoleStore().getAllRoles();
  if (apiResponse.status === RequestsStatus.SUCCESS)
    fetchedRoles.value = apiResponse.data ?? [];
  isLoadingPost.value = false;
};

onBeforeMount(() => {
  fetchServices();
  fetchRoles();
});
const create = async () => {
  isLoading.value = true;
  const newUser = new Employee({
    firstname: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roles: [user.roles],
    password: user.password,
    posts: [user.post.basePost.postAsDTO],
  });
  user.password = "";

  const userCreationResponse = await useEmployeeStore().createEmployee(newUser);
  if (userCreationResponse.status === RequestsStatus.SUCCESS) emit("created");

  isLoading.value = false;
};
const close = (): void => {
  emit("close");
};
</script>
