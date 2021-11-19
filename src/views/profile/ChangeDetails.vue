<template>
  <h1 class="text-2xl mb-4">Upravit údaje</h1>

  <button class="p-2 bg-theorange rounded my-4">
    <router-link to="PasswordChange"> Změnit heslo </router-link>
  </button>

  <div class="mb-4">
    <h2 class="text-xl mb-1">Změna emailu</h2>
    <label for="new_email" class="text-sm block">Nový email</label>
    <input
      type="email"
      placeholder="example@email.com"
      name=""
      id="new_email"
      class="p-1 rounded"
    />
    <button class="bg-theorange ml-2 rounded p-1">Potvrdit</button>
  </div>

  <div class="mb-4">
    <h2 class="text-xl mb-1">Změna adresy</h2>
    <label for="new_address" class="text-sm block">Nová adresa</label>
    <input
      type="text"
      placeholder="Jetelí 8, Praha 3 - Žižkov"
      name=""
      id="new_address"
      class="p-1 rounded"
    />
    <button class="bg-theorange ml-2 rounded p-1">Potvrdit</button>
  </div>
</template>

<script>
export default {}; // todo
</script>

<style>
</style>