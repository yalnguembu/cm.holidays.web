<template>
  <div class="w-full pb-2">
    <div class="border-b w-full flex justify-between items-center">
        <div>
            <h1 class="text-3xl font-semibold py-4 text-blue-900"> {{title}} </h1>
            <p class="text-gray-500 pb-2">{{description}}</p>
        </div>
        <div class="min-w-1/5">
           <slot />
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    }
})
</script>