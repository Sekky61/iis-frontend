<template>
  <h1 class="text-3xl pb-4">Dashboard</h1>
  <h2 class="text-xl pb-2">Akce</h2>
  <router-link
    :to="{ name: 'LicitAllAuctions' }"
    class="ml-2 p-2 bg-theorange rounded px-5 shadow"
  >
    Všechny aukce
  </router-link>
  <router-link
    :to="{ name: 'LicitMyAuctions' }"
    class="ml-2 p-2 bg-theorange rounded px-5 shadow"
  >
    Mé aukce
  </router-link>
  <router-link
    :to="{ name: 'LicitConfirm' }"
    class="ml-2 p-2 bg-theorange rounded px-5 shadow"
  >
    Žádosti o schválení
  </router-link>
</template>

<script>
export default {};
</script>

<style>
</style>