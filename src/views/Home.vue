<template>
  <div class="home">
    <h1>Homepage</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'DbTest' }">DB Test</router-link> |
      <router-link :to="{ name: 'Register' }">Register</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>
  <button @click="toggle_logged_in" class="p-4 bg-yellow-400 rounded m-4">
    toggle logged in
  </button>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState({
      logged_in_alias: "logged_in",
    }),
  },
  methods: {
    ...mapMutations(["set_logged_in"]),

    toggle_logged_in() {
      this.set_logged_in({
        logged: !this.logged_in_alias,
        user_data: {
          user_name: "RealFranta99",
          role: "Admin",
          first_name: "Franta",
          last_name: "Koumal",
          address: "Božetěchova 12, Brno II - The Brněning",
          birth_date: new Date("1999-01-08"),
          email: "fjakofranta@vut.cz",
          profile_photo_url: "/resources/profile_pic.webp",
        },
      });
    },
  },
};
</script>
