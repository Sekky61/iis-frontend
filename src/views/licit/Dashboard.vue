<template>
  <h1 class="text-xl">Přehled licitátora</h1>
  <div class="grid gap-4 grid-cols-4">
    <router-link
      :to="{ name: 'LicitAuctions' }"
      class="ml-2 p-2 bg-theorange rounded px-5 shadow"
    >
      Aukce
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>