<template>
  <div class="w-full shadow-md flex justify-center">
    <nav
      data-test="nav-bar"
      :class="[
        'w-full flex items-center px-8 bg-white md:px-5 xl:max-w-[98vw] 2xl:max-w-[95vw]',
        isUserConnected ? 'justify-between' : 'justify-center',
      ]"
    >
      <RouterLink to="/" class="flex">
        <img
          v-if="isUserConnected"
          alt="LAO logo"
          title="LAO logo"
          src="@/assets/logo.svg"
          class="w-14"
        />
        <span class="text-2xl p-4 font-bold text-blue-900">HOLIDAYS</span>
      </RouterLink>
      <div class="flex items-center">
        <ul class="flex">
          <li
            v-for="(item, index) in items"
            :key="index"
            :data-test="`nav-${index}`"
            class="relative overflow-hidden transition"
          >
            <RouterLink
              :to="item.path"
              :class="[
                'block px-4 p-4 mx-2 font-semibold text-lg hover:text-blue-300',
                isTheActiveRoute(item.name ?? '')
                  ? 'text-blue-primary'
                  : 'text-gray-500',
              ]"
              >{{ item.label }}</RouterLink
            >
            <div
              class="absolute w-full -bottom-1 left-0 bg-blue-primary transition p-1 rounded-full"
              v-if="isTheActiveRoute(item.name ?? '')"
            />
          </li>
        </ul>
      </div>
      <div class="relative" v-if="isUserConnected">
        <button
          class="flex items-center hover:bg-gray-100 py-2 px-4 rounded-lg"
          @click.stop="toggleIsShouldDisplayProfileOverviewModal"
        >
          <AccountIcon class="cursor-pointer h-8 w-8" />
          <span class="font-bold text-base ml-2 text-gray-500">{{
            user.fullName
          }}</span>
        </button>
        <UserProfile
          :user="user"
          v-if="shouldDisplayProfileOverviewModal"
          @close="toggleIsShouldDisplayProfileOverviewModal"
          @signOut="displaySignOutModal"
        />
      </div>
      <ConfirmationModal
        title="Sign Out"
        description="Are you sure that you realy want tot sign out?, after click on this button your will be redirected to the login page"
        v-if="shouldDisplaySignOutModal"
        @confirm="signOut"
        :is-loading="isLoading"
        :theme="COLOR_THEME.RED"
        @close="shouldDisplaySignOutModal = false"
      />
    </nav>
  </div>
  <OfflineModal />
</template>

<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import AccountIcon from "./icons/AccountIcon.vue";
import UserProfile from "./modals/UserProfileModal.vue";
import type { NavaBarItem } from "@/utils/menu";
import { Session } from "@/domain/Session";
import { useRoute, useRouter } from "vue-router";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";
import { useSessionStore } from "@/store/session";
import { COLOR_THEME } from "@/utils/enum";
import OfflineModal from "@/components/modals/OfflineModal.vue";

const props = defineProps({
  items: {
    type: Array as PropType<Array<NavaBarItem>>,
  },
  user: {
    type: Object as PropType<Session>,
    required: true,
  },
});

const router = useRouter();

const isUserConnected = computed(() => !props.user.isNull);

const isTheActiveRoute = (route: string): boolean => useRoute().name === route;
const shouldDisplayProfileOverviewModal = ref<boolean>(false);

const toggleIsShouldDisplayProfileOverviewModal = (): void => {
  shouldDisplayProfileOverviewModal.value =
    !shouldDisplayProfileOverviewModal.value;
};
const isLoading = ref<boolean>(false);
const shouldDisplaySignOutModal = ref<boolean>(false);

const signOut = async () => {
  isLoading.value = true;
  localStorage.clear();
  useSessionStore().signOut();
  await router.push({ replace: true, path: "/auth/sign-in" });
  isLoading.value = false;
  shouldDisplaySignOutModal.value = false;
};

const displaySignOutModal = (): void => {
  toggleIsShouldDisplayProfileOverviewModal();
  shouldDisplaySignOutModal.value = true;
};
</script>
