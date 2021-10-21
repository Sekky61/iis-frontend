<template>
  <div class="home">
    <h1>Homepage</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link> |
      <router-link :to="{ name: 'DbTest' }">DB Test</router-link>
    </div>
  </div>
  <label class="flex items-center space-x-3">
    <input
      :checked="logged_in_state"
      @click="toggle_logged_in"
      type="checkbox"
      value="1"
      class="
        h-6
        w-6
        border border-gray-300
        rounded-md
        checked:bg-blue-600 checked:border-transparent
        focus:outline-none
      "
    />
    <span class="text-gray-900 font-medium">Logged in</span>
  </label>
  <label class="flex items-center space-x-3 mt-2">
    <input
      :checked="admin_state"
      @click="toggle_admin"
      type="checkbox"
      value="1"
      class="
        h-6
        w-6
        border border-gray-300
        rounded-md
        checked:bg-blue-600 checked:border-transparent
        focus:outline-none
      "
    />
    <span class="text-gray-900 font-medium">Admin</span>
  </label>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      logged_in_state: "logged_in",
      admin_state: "admin",
    }),
  },
  methods: {
    ...mapMutations(["set_logged_in", "set_admin"]),

    toggle_logged_in() {
      this.set_logged_in({
        logged: !this.logged_in_state,
        user_data: {
          first_name: "aq",
          last_name: "aq",
          username: "aq",
          password: "fd5689561452",
          email: "ew@ew",
          birth_date: new Date("2012-04-23"),
          address: "addr",
          phone: "12345",
        },
      });
    },

    toggle_admin() {
      console.log("Call ", this.admin_state);
      this.set_admin(!this.admin_state);
    },
  },
};
</script>
