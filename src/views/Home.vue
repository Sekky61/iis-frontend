<template>
  <div class="home">
    <h1>Homepage</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'Jobs' }">Jobs</router-link> |
      <router-link :to="{ name: 'DbTime' }">DB Time</router-link> |
      <router-link :to="{ name: 'Register' }">Register</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>
  <button @click="toggle_logged_in" class="p-4 bg-yellow-400 rounded m-4">
    toggle logged in
  </button>
</template>

<script>
import { store, mutations } from "../store";

export default {
  name: "Home",
  methods: {
    toggle_logged_in() {
      mutations.set_logged_in(!store.logged_in);
    },
  },
};
</script>
