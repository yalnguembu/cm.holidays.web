<template>
  <div
    class="hidden absolute top-4 right-3 transition duration-500 group-hover:flex items-center"
  >
    <div
      :class="['border rounded-full w-11 flex bg-gray-100 border-gray-300', isActive ? 'justify-end' : 'justify-start']"
      :title="isActive ? 'Deactivate' : 'Activate'"
    >
      <button
        class="rounded-full bg-green-600 text-white"
        v-if="isActive"
        @click.stop="$emit('deactivate')"
      >
        <CheckCirleIcon class="w-6 h-6" />
      </button>
      <button
        class="rounded-full bg-gray-300 p-0"
        v-else
        @click.stop="$emit('activate')"
      >
        <CheckCirleIcon class="w-6 h-6 stroke-gray-100 m-0" />
      </button>
    </div>
    <div class="flex hover:text-white ml-2">
      <button
        class="p-2 h-fit border-2 rounded-full hover:bg-gray-100 bg-white border-transparent font-bold text-gray-500 transition hover:shadow-md duration-500 hover:text-blue-primary"
        @click.stop="$emit('edit')"
      >
        <EditIcon />
      </button>
      <button
        class="ml-2 p-2 h-fit border-2 rounded-full hover:bg-gray-100 bg-white border-transparent font-bold text-gray-500 transition hover:shadow-md duration-500 hover:text-red-600"
        @click.stop="$emit('delete')"
      >
        <TrashIcon />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/PencilIcon.vue";
import CheckCirleIcon from "@/components/icons/CheckCircleIcon.vue";

defineEmits(["delete", "edit", "activate", "deactivate"]);

defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>
