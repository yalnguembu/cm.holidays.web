<template>
  <div class="w-full shadow rounded overflow-hidden animate-pulse">
    <div class="bg-gray-400 grid grid-cols-5">
      <div class="p-6">
        <div class="h-3 bg-gray-100 rounded w-20" />
      </div>
      <div class="p-6">
        <div class="h-3 bg-gray-100 rounded w-16" />
      </div>
      <div class="p-6">
        <div class="h-3 bg-gray-100 rounded w-20" />
      </div>
      <div class="p-6">
        <div class="h-3 bg-gray-100 rounded w-20" />
      </div>
      <div class="p-6">
        <div class="h-3 bg-gray-100 rounded w-35" />
      </div>
    </div>
    <div v-for="index in 4" :key="index">
      <div class="border-t grid grid-cols-5">
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-30" />
        </div>
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-20" />
        </div>
        <div class="p-3 px-6">
          <div class="p-1 px-4 bg-gray-200 rounded w-fit">
            <div class="h-2 bg-gray-400 rounded w-20" />
          </div>
        </div>
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-10" />
        </div>
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-35" />
        </div>
      </div>
      <div class="border-t grid grid-cols-5">
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-24" />
        </div>
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-14" />
        </div>
        <div class="p-3 px-6">
            <div class="p-1 px-4 bg-gray-200 rounded w-fit">
            <div class="h-2 bg-gray-400 rounded w-14" />
          </div>
        </div>
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-15" />
        </div>
        <div class="p-4 px-6">
          <div class="h-3 bg-gray-300 rounded w-28" />
        </div>
      </div>
    </div>
  </div>
</template>
