<template>
  <div class="w-full">
    <table class="w-full table">
      <thead class="bg-blue-primary text-white text-left">
        <tr>
          <th v-if="hasIndex">#</th>
          <th
            v-for="columnHeader in columnHeaders"
            :key="columnHeader.key"
            class="p-4 px-4"
            data-test="header-col-label"
          >
            {{ columnHeader.label }}
          </th>
        </tr>
      </thead>
      <tbody class="w-full">
        <template v-if="!isLoading">
          <template v-if="rows.length">
            <template v-for="(row, index) in rows" :key="index">
              <slot :row="row" :index="index">
                <tr
                  data-test-id="item"
                  :data-test="row.getId()"
                  class="bg-gray-500"
                >
                  <td v-if="hasIndex">{{ index + 1 }}</td>
                  <td
                    v-for="(columnHeader, index) in columnHeaders"
                    :key="index"
                  >
                    {{ row.getTextFor(columnHeader.key) }}
                  </td>
                </tr>
              </slot>
            </template>
          </template>
          <div v-else data-test="no-data">
            <tr class="text-center w-full">
              <td>Nothing to display</td>
            </tr>
          </div>
        </template>
      </tbody>

    </table>
    <div  v-if="isLoading" class="w-full border flex items-center justify-center p-4">
        <SpinnerLoader class="h-12 w-12" />
    </div>
    <div class="flex justify-between items-center border-t">
      <div
        v-if="hasTotal"
        data-test="total-title"
        class="text-gray-800 text-md font-semibold p-4 font-sourceSansPro-Regular bg-white w-full rounded-b-md flex items-center"
      >
        <span class="mr-2">
          {{ totalElementTitle }} :
        </span>
        <SpinnerLoader v-if="isLoading" class="h-4 w-4 border-[3.5px]" />
        <span v-else>
         {{ rows.length }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { DataGridRow, DataGridColumnHeader } from "@/utils/type";
import SpinnerLoader from "@/components/SpinnerLoader.vue"

const props = defineProps({
  columnHeaders: {
    type: Array as PropType<DataGridColumnHeader>,
    required: true,
  },
  rows: {
    type: Array as PropType<DataGridRow>,
    required: true,
  },
  hasTotal: {
    type: Boolean,
    default: true,
  },
  totalElementTitle: {
    type: String,
    default: "Total",
  },
  hasHeadersFixed: {
    type: Boolean,
    default: true,
  },
  hasPaggination: {
    type: Boolean,
    default: true,
  },
  isLoading: {
    type: Boolean,
  },
  hasIndex: {
    type: Boolean,
  },
});
</script>
