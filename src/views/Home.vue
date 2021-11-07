<template>
  <prohlizec></prohlizec>

  
  <user-list></user-list>

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

  <img class="w-48" src="resources/logo_split.svg" alt="loading" />
  <span>Loading animation ^^</span>
</template>



<script type="module">



import { mapState, mapMutations, mapActions} from "vuex";
import Slider from "../components/img_slider/Slider.vue";
import UserList from "../components/userlist/UserList.vue";
import prohlizec from "../components/prohlizec_fotek/prohlizec.vue";


export default {
  name: "Home",
  components: { Slider, UserList, prohlizec},
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
    ...mapActions(["set_logged_in"]),
    ...mapMutations(["set_admin"]),

    toggle_logged_in() {
      this.set_logged_in({
        logged_in: !this.logged_in_state,
        user_data: {
          first_name: "Joe",
          last_name: "Tsunami",
          username: "joey_small_wave97",
          email: "joestar@msn.com",
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
