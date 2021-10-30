<template>
  <h1 class="text-2xl">Můj profil</h1>

  <div class="my-6 flex justify-start gap-3">
    <router-link
      :to="{ name: 'ChangeDetails' }"
      class="p-2 bg-theorange rounded px-5 shadow"
    >
      Upravit údaje
    </router-link>
    <router-link
      :to="{ name: 'AddAuction' }"
      class="p-2 bg-theorange rounded px-5 shadow"
    >
      Nová aukce
    </router-link>
    <router-link
      v-if="admin"
      :to="{ name: 'Admin' }"
      class="ml-2 p-2 bg-theorange rounded px-5 shadow"
    >
      Admin
    </router-link>
  </div>

  <div class="grid grid-cols-3 gap-3 grid-rows-3 py-6">
    <div class="pl-4 p-2 bg-theorange rounded col-span-2">
      <div class="text-xl font-bold">
        {{ user.username }}
      </div>
      <div class="text-md">
        {{ user_full_name }}
      </div>
    </div>
    <div class="pl-4 p-2 bg-theorange rounded row-span-2">
      <div class="text-sm pb-1">Profilová fotka</div>
      <picture>
        <img
          v-bind:src="user.profile_photo_url"
          alt="Profile picture"
          class="rounded-full"
        />
      </picture>
    </div>
    <div class="pl-4 p-2 bg-theorange rounded">
      <div class="text-sm pb-1">Email</div>
      {{ user.email }}
    </div>
    <div class="pl-4 p-2 bg-theorange rounded">
      <div class="text-sm pb-1">Uživatelské jméno</div>
      {{ user.user_name }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "MyProfile",
  computed: {
    ...mapState({
      user: "user_data",
      admin: "admin",
    }),
    ...mapGetters(["user_full_name"]),
  },
  methods: {
    ...mapMutations(["set_logged_in"]),

    loguser() {
      console.log(this.user);
    },
  },
};
</script>

<style>
</style>