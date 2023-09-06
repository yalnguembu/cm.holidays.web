<template>
  <div>
    <h2 class="font-bold text-2xl text-gray-700 text-center">Edit profile</h2>
    <div class="flex justify-center mt-8">
      <div class="relative">
        <AccountIcon class="cursor-pointer h-20 w-20" />
        <button class="absolute bottom-0 right-0">PICK</button>
      </div>
    </div>
    <TextField
      label="Name"
      placeholder="Enter your name here"
      v-model="profile.name"
    />
    <TextField
      label="Email"
      placeholder="Enter your email here"
      v-model="profile.email"
    />
    <div class="text-right mt-6">
      <BaseButton
        title="Cancel"
        @click="emits('close')"
        class="shadow-none font-normal text-black bg-gray-200 text-base hover:bg-gray-300"
      />
      <BaseButton
        title="Save"
        @click="emits('edited')"
        class="ml-4 shadow-none text-base hover:shadow-md hover:shadow-blue-primary/50"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextField from "./form/TextField.vue";
import BaseButton from "./BaseButton.vue";
import AccountIcon from "./icons/AccountIcon.vue";
import { PropType, reactive } from "vue";

const emits = defineEmits<{
  (event: "close"): void;
  (event: "edited"): void;
}>();
interface Profile {
  name: string;
  email: string;
  picture: string;
  joinedDate: string;
}
const props = defineProps({
  profile: {
    type: Object as PropType<Profile>,
    required: true,
  },
});

const profile = reactive<Profile>(props.profile);
</script>
