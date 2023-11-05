<template>
  <p
    :class="[
      'font-semibold inline rounded-xl p-1 px-4',
      value === HOLIDAY_STATUS.REJECTED
        ? ' bg-red-100 text-red-500'
        : value === HOLIDAY_STATUS.PENDING
        ? 'bg-orange-100 text-orange-500'
        : value === HOLIDAY_STATUS.APPROVED
        ? 'bg-green-100 text-green-600'
        : ' bg-yellow-100/80  text-yellow-500',
    ]"
    data-test="creation-time"
  >
    {{ capitalizeWord(value) }}
  </p>
</template>
<script lang="ts" setup>
import { capitalizeWord } from "@/utils/string";
import { HOLIDAY_STATUS } from "@/utils/enum";
import { PropType } from "vue";

defineProps({
  value: {
    type: String as PropType<HOLIDAY_STATUS>,
    required: true,
  },
});
</script>
