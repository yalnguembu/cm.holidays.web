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
    <div class="space-y-2">
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
          label="Email"
          data-test="holiday-type"
          :is-required="true"
          placeholder="Enter the email address here"
          v-model="user.email"
          :error="error.title"
      />
      <div v-if="isUserAnAdmin">
        <div class="mb-4">
          <p class="pb-2 font-semibold text-gray-700">Roles</p>
          <div class="flex gap-y-2 flex-wrap space-x-5 items-center">
            <CheckBox
                v-for="role in fetchedRoles"
                :key="role.id"
                :model-value="role"
                :label="role.type.toLowerCase()"
                :is-checked="isUserHasRole(role as Role)"
            />
          </div>
        </div>
        <SelectInput
            label="Post"
            :options="posts"
            v-model="user.post"
            :default-value="defaultPost"
        />
      </div>
    </div>
    <div class="grid md:grid-cols-2 mt-4 gap-x-4 mb-2">
      <BaseButton
          @click="close"
          title="cancel"
          data-test="submit-button"
          class="w-full shadow-none text-base text-white mt-4 hover:shadow-md font-semibold md:mt-0 bg-gray-500"
      />
      <BaseButton
          title="Save"
          :disabled="!shouldCreationButtonEnable"
          data-test="submit-button"
          @click="create"
          :class="[
              'w-full text-base mt-4 text-white disabled:text-gray-500 font-semibold md:mt-0',
              shouldCreationButtonEnable ? 'bg-blue-primary/100 hover:shadow-blue-primary hover:shadow-md cursor-pointer':' bg-blue-primary/20 cursor-not-allowed shadow-none'
          ]"
      />
    </div>
  </form>
</template>
<script lang="ts" setup>
import BaseButton from "@/components/BaseButton.vue";
import TextField from "@/components/forms/TextField.vue";
import {reactive, computed, ref, PropType, onBeforeMount} from "vue";
import {HolidayErrors, OptionItem} from "@/utils/types";
import {Session} from "@/domain/Session";
import {USER_ROLE} from "@/services";
import SelectInput from "@/components/forms/SelectInput.vue";
import {usePostStore} from "@/store/post";
import {RequestsStatus} from "@/utils/api";
import {Post} from "@/domain/Post";
import CheckBox from "@/components/forms/CheckBox.vue";
import {Role} from "@/domain/Role";
import {useRoleStore} from "@/store/role";

const props = defineProps({
  profile: {
    type: Object as PropType<Session>,
    required: true,
  }
});
const emit = defineEmits<{
  (event: "close"): void;
  (event: "created"): void;
}>();

const user = reactive({
  firstName: props.profile?.fullName,
  lastName: props.profile?.lastName,
  email: props.profile?.email,
  role: props.profile?.roles,
  post: props.profile?.posts[0],
  password: "",
});

const defaultPost: OptionItem = {
  key: props.profile?.posts[0]?.name,
  valueOption: props.profile?.posts[0],
  label: props.profile?.posts[0]?.name
};

const isProcessing = ref<boolean>(false);

const shouldCreationButtonEnable = computed(() =>
    !!user.firstName && !!user.email && !isProcessing.value)
const error = reactive<HolidayErrors>({
  title: "",
  description: "",
  service: ""
});

const isUserAnAdmin = computed<boolean>(() => {
  return !!props.profile?.roles
      .filter((role) =>
          role.type === USER_ROLE.ADMIN || role.type === USER_ROLE.HUMAN_RESOURCE
      ).length
});

const posts = ref<OptionItem[]>([]);
const fetchedRoles = ref<Role[]>([]);
onBeforeMount(async () => {
    const apiResponse = await usePostStore().getAllPosts();
    if (apiResponse.status === RequestsStatus.SUCCESS)
      posts.value = (apiResponse.data as Post[]).map((post) => {
        return {
          label: post.name,
          key: post.name,
          valueOption: post,
      }
    });
    const apiResponseRoles = await useRoleStore().getAllRoles();
    if (apiResponseRoles.status === RequestsStatus.SUCCESS)
      fetchedRoles.value = apiResponseRoles.data ?? [];
});

const isUserHasRole = (role: Role): boolean => {
  return !!props.profile?.roles.find((userRole) => userRole.type === role.type)
}

const create = (): void => {
  emit("created")
};
const close = (): void => {
  emit("close");
};
</script>
