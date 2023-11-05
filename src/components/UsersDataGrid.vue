<template>
  <div class="shadow">
    <DataGrid
      :isLoading="isLoading"
      :columnHeaders="headers"
      :rows="usersAsDataGridRows"
      total-element-title="Users Total"
    >
      <template v-slot="{ row }">
        <tr
          :data-test="`line-${row.getId()}`"
          class="border-t hover:border-t-transparent hover:bg-blue-100/50 cursor-pointer text-gray-500"
        >
          <td v-for="(header, key) in headers" :key="key" class="px-4">
            <span class="font-semibold" v-if="header.key === 'id'">
              {{ row.getId() }}
            </span>
            <div
              v-else-if="header.key === 'name'"
              class="flex items-center w-[15rem] py-3 2xl:w-[20rem]"
            >
              <AccountIcon class="mr-4 w-8 h-8" />
              <span class="text-blue-primary font-semibold">
                {{ row.getTextFor(header.key) }}
              </span>
            </div>
            <span
              v-else-if="header.key === 'roles'"
              class="flex items-center"
            >
                {{ row.getTextFor(header.key) }}
            </span>
            <span
              v-else-if="header.key === 'action'"
              class="w-full justify-center flex font-semibold"
            >
              <MenuWrapper>
                <template #icon>
                  <button class="p-2 rounded-full hover:bg-white">
                    <OptionsIcon class="h-6 w-6 stroke-2" />
                  </button>
                </template>
                <template #items>
                  <ul
                    class="w-[12rem] bg-white shadow-lg border border-gray-100/70 rounded-lg"
                  >
                    <MenuItem
                      v-for="option in options"
                      :key="option.label"
                      v-bind="option"
                      @click.stop="handelClick[option.key](row.getId())"
                    />
                  </ul>
                </template>
              </MenuWrapper>
            </span>
            <span v-else class="overflow-hidden truncate">
              {{ row.getTextFor(header.key) }}
            </span>
          </td>
        </tr>
      </template>
    </DataGrid>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, computed, ref } from "vue";
import {
  usersDataGridColumnHeaders as headers,
  UserToDataGridRow,
} from "@/utils/user";
import DataGrid from "./DataGrid.vue";
import OptionsIcon from "@/components/icons/OptionsIcon.vue";
import MenuWrapper from "@/components/MenuWrapper.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import AccountIcon from "@/components/icons/AccountIcon.vue";
import MenuItem from "@/components/MenuItem.vue";
import { Employee } from "../domain/Employee";

const options = [
  {
    label: "Edit",
    key: "edit",
    icon: PencilIcon,
  },
];

const props = defineProps({
  users: {
    type: Array as PropType<Array<Employee>>,
    required: true,
  },
  isLoading: {
    type: Boolean,
  },
});

const usersAsDataGridRows = computed(()=> props.users.map(
  (user) => new UserToDataGridRow(user)
));
</script>
