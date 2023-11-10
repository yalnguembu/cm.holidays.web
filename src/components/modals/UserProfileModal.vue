<template>
  <ModalWrapper>
    <div class="absolute top-20 right-16 bg-white shadow-lg rounded-lg overflow-hidden p-5 lg:w-[25rem] lg:border">
      <EditProfile
          @close="toggleShouldEditProfile"
          :profile="user"
          v-if="shouldEditProfile"
      />
      <div v-else>
        <div>
          <div class="flex items-start h-20">
            <AccountIcon class="cursor-pointer h-14 w-14" />
            <div class="ml-4 mb-4 self-end">
              <p class="font-bold text-xl text-blue-primary">
                {{ user.fullName }}
              </p>
              <p class="text-base text-gray-500">{{ user.email }}</p>
            </div>
          </div>
          <p class="text-gray-500 text-center mt-4 mb-2">
            Employee since {{ dateToLocalString(user.creationDate) }}
          </p>
          <div class="border-t p-2 w-full">
            <div class="py-1">
              <h5 class="text-blue-950 font-medium">Post</h5>
              <p class="text-gray-500 text-lg mt-2 font-medium">
                {{ user.posts.map((post) => post.name).join(",") }}
              </p>
            </div>
          </div>
          <div class="text-blue-950 font-medium">
            <button
                @click="toggleShouldEditProfile"
                type="button"
                class="border-t p-3 text-left w-full hover:bg-blue-50"
            >
              <EditIcon class="w-6 h-6 inline -rotate-6" />
              <span class="ml-4 text-lg">Edit profile</span>
            </button>
            <button
                type="button"
                class="border-t p-3 text-left w-full hover:bg-blue-50"
            >
              <SettingIcon class="w-6 h-6 inline" />
              <span class="ml-4 text-lg">Setting</span>
            </button>
            <button
                type="button"
                class="border-t p-3 text-left w-full hover:bg-blue-50"
                @click.stop="$emit('signOut')"
            >
              <LogoutIcon clshouldDisplaySignOutModalass="w-6 h-6" />
              <span class="ml-4 text-lg">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>
<script lang="ts" setup>
import {PropType, ref} from "vue";
import AccountIcon from "../icons/AccountIcon.vue";
import EditIcon from "../icons/PencilIcon.vue";
import LogoutIcon from "../icons/LogoutIcon.vue";
import EditProfile from "../ProfileEdition.vue";
import { dateToLocalString } from "@/utils/date";
import ModalWrapper from "@/components/modals/ModalWrapper.vue";
import SettingIcon from "@/components/icons/SettingIcon.vue";
import { Session } from "@/domain/Session";

const shouldEditProfile = ref<boolean>(false);
const toggleShouldEditProfile = (): void => {
  shouldEditProfile.value = !shouldEditProfile.value;
}

defineProps({
  user:{
    type: Object as PropType<Session>,
    required: true,
  }
});

defineEmits(['signOut'])
</script>
