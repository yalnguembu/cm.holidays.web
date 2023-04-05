<template>
  <main>
    <div
      class="container text-center px-4 flex flex-col justify-around lg:pb-0 lg:p-20"
    >
      <h1 class="font-bold text-3xl">Hello, welcome...</h1>
      <p class="text-gray-500 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis
        quasi dicta sed ipsum quas nihil, quis pariatur.
      </p>
      <div class="w-full md:flex justify-center gap-4 mt-4">
        <button
          title="Create new holiday"
          class="w-full shadow-xl shadow-blue-400 bg-blue-primary mb-4 text-left text-base text-white p-4 rounded-md font-bold md:text-center shadow-lg md:w-[248px] md:mb-0"
          @click="toggleFormModal"
        >
          <span class="mr-2 py-1 px-2 bg-blue-400 rounded">
            <AddIcon class="fill-white" />
          </span>
          Create new holiday
        </button>
        <RouterLink
          to="/list"
          class="w-full bg-blue-light shadow-lg shadow-blue-200 inline-block text-blue-500 text-left text-base p-4 rounded-md font-bold mb-4 md:mb-0 md:text-center md:w-[248px]"
        >
          <CalendarIcon class="inline align-middle mr-4" />
          Liste des conges
        </RouterLink>
      </div>
      <div class="w-full">
        <img
          src="../assets/illustration-home.svg"
          alt="welcome"
          class="mx-auto w-full md:w-auto lg:w-2/5"
        />
      </div>
    </div>
    <CreationHolidayForm v-if="isFormVisible" @close="toggleFormModal" />
  </main>
</template>

<script setup lang="ts">
import AddIcon from "../components/icons/AddIcon.vue";
import CalendarIcon from "../components/icons/CalendarIcon.vue";
import CreationHolidayForm from "../components/CreationHolidayForm.vue";
import { ref } from "vue";

const isFormVisible = ref<boolean>(false);

const toggleFormModal = () => {
  isFormVisible.value = !isFormVisible.value;

};
</script>
