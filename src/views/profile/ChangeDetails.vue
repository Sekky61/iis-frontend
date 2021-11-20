<template>
  <h1 class="text-2xl mb-4">Upravit údaje</h1>
  <div class="flex gap-6">
    <div>
      <div class="mb-4">
        <label class="text-sm font-bold pl-1">Nový email</label>
        <input
          v-model="email"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="name@email.cz"
        />
      </div>

      <div class="mb-4">
        <label class="text-sm font-bold pl-1">Nové jméno</label>
        <input
          v-model="first_name"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="Jirka"
        />
        <label class="text-sm font-bold pl-1">Nové příjmení</label>
        <input
          v-model="last_name"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="Novák"
        />
      </div>
    </div>
    <div>
      <div class="mb-4">
        <label class="text-sm font-bold pl-1">Nové heslo</label>
        <input
          v-model="email"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="Heslo"
        />
      </div>
      <label class="text-sm font-bold pl-1">Potvrdit heslo</label>
      <input
        v-model="email"
        class="input-field w-72 mb-4"
        type="text"
        placeholder="Heslo"
      />
    </div>
  </div>
  <button class="bg-theorange ml-2 rounded py-2 px-3">Potvrdit</button>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      first_name: "",
      last_name: "",

      password: "",
      confirm_password: "",
    };
  },
}; // todo
</script>

<style>
</style>