<template>
  <div class="relative">
    <div @click.stop="shouldDisplayOptions = true">
      <slot name="icon" />
    </div>
    <div v-if="shouldDisplayOptions" class="absolute top-10 right-5" ref="optionsWrapper">
      <slot name="items" @click="shouldDisplayOptions= false" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect} from "vue";
import { useDetectOutsideClick } from "@/utils/outsideClick";

const optionsWrapper = ref<HTMLDivElement | undefined>();
const shouldDisplayOptions = ref<boolean>(false);

useDetectOutsideClick(optionsWrapper,()=> shouldDisplayOptions.value= false);
</script>