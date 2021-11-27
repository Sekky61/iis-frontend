<template>
  <h1 class="text-3xl pb-4">Dashboard</h1>
  <router-link
    :to="{ name: 'UserAuctionsList' }"
    class="ml-2 p-2 bg-theorange rounded px-5 shadow"
  >
    Mé aukce
  </router-link>
  <router-link
    :to="{ name: 'UserParticipatesList' }"
    class="ml-2 p-2 bg-theorange rounded px-5 shadow"
  >
    Aukce kterých se účastním
  </router-link>
</template>

<script>
export default {};
</script>

<style>
</style>