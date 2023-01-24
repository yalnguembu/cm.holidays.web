<template>
  <div class="bg-red-200 border-l-4 border-red-500 p-4">
    <p class="text-red-500 font-bold">
      <InfoIcon class="mr-2 align-middle" />
      {{ title }}
    </p>
  </div>
</template>

<script>
import InfoIcon from "./icons/InfoIcon.vue";
export default {
  name: "ErrorAlert",

  components: {
    InfoIcon,
  },

  props: {
    title: { type: String },
  },
};
</script>
