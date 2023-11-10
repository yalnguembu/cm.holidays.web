<template>
  <div class="flex flex-col justify-center items-center min-h-[80vh] h-full w-full">
    <h1 class="font-bold text-gray-500 text-9xl italic">404</h1>
    <h1 class="text-gray-500 text-4xl italic mt-5">Page not found</h1>
    <RouterLink :to='{name:"/Home"}' class="px-4 py-2 mt-8 bg-blue-500 rounded-sm text-white font-500 text-xl">backToHome</RouterLink>
  </div>
</template>
