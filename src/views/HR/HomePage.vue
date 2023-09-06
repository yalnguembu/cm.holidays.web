<template>
  <main>
    <div
      class="container text-center px-4 flex flex-col justify-around lg:pb-0 lg:p-20"
    >
      <p class="text-gray-500 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis
        quasi dicta sed ipsum quas nihil, quis pariatur.
      </p>
      <div class="w-full mt-4 md:flex items-center justify-center space-x-8">
        <RouterLink
          to="human-ressources/holiday-requests"
          class="p-8 rounded-lg border hover:border-transparent flex flex-col items-center justify-center hover:bg-blue-100/50 hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72"
        >
          <CalendarIcon class="block mr-4 h-20 w-20 fill-gray-500 stoke-gray-500" />
          <br />
          <span class="text-xl text-blue-500 font-bold mt-8">Holidays requests</span>
        </RouterLink>
        <RouterLink
          to="human-ressources/holiday-requests"
          class="p-8 rounded-lg border hover:border-transparent flex flex-col items-center justify-center hover:bg-blue-100/50 hover:shadow-lg hover:shadow-blue-200 inline-block md:w-72 md:h-72"
        >
          <CalendarIcon class="block mr-4 h-20 w-20 fill-gray-500 stoke-gray-500" />
          <br />
          <span class="text-xl text-blue-500 font-bold mt-8">Users</span>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CalendarIcon from "@/components/icons/CalendarIcon.vue";
</script>
