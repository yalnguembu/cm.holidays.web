<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
<span
    :class="[
      'relative flex h-3 w-3 rounded-full cursor-pointer',
       isActive ? 'activate' : 'deactive'
    ]"
    :title="isActive ? 'Active' : 'Deactivate'"
>
  <span
      :class="
      [
         'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
         isActive ? 'activate' : 'deactive'
      ]"></span>
  <span
      :class="[
          'relative inline-flex rounded-full h-3 w-3 bg-sky-500',
           isActive ? 'bg-green-500' : 'bg-red-600'
      ]"></span>
</span>
</template>
<style scoped>
.activate {
  background: linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147));
}

.deactive {
  background: linear-gradient(to right, rgb(244, 146, 216), rgb(241, 21, 49));
}
</style>