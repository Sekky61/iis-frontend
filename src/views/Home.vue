<template>
 <div class="m-2 bg-bgcolor ">
    <div class="flex justify-center transform scale-x-75 scale-y-75">
      <Slider></Slider>
    </div>
  </div>

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




<script>
import { mapState, mapMutations } from "vuex";
import Slider from "../components/img_slider/Slider.vue";
import Slide from "../components/img_slider/Slide.vue";
import Image from "../components/img_slider/Image.vue";


export default {
  name: "Home",
  components: { Slider, Slide, Image},
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
          first_name: "Joe",
          last_name: "Tsunami",
          username: "joey_small_wave97",
          email: "joestar@msn.com",
          birth_date: new Date("2012-04-23"),
          address: "Kolodia 5, Florencia",
          phone: "(708) 224-6191",
          profile_photo_url: "resources/profile_pic.webp",
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
