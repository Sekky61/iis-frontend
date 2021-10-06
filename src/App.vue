<template>
  <nav class="relative bg-red-secondary mb-3 h-28">
    <router-link to="/" class="absolute pl-4">
      <picture>
        <img src="resources/logo_small.webp" alt="logo" class="w-24" />
      </picture>
    </router-link>
    <div class="flex items-center justify-center h-full">
      <div class="flex flex-row relative">
        <!-- 15px is half of icon height -->
        <img
          src="resources/search_icon.svg"
          class="absolute left-2"
          style="top: calc(50% - 15px)"
        />
        <input
          class="rounded-full p-2 pl-10"
          type="search"
          placeholder="Vyhledávání..."
          aria-label=" Search"
        />
        <button
          class="
            font-bold
            py-2
            px-2
            uppercase
            text-xs text-white
            hover:opacity-75
          "
          type="submit"
        >
          Vyhledat
        </button>
      </div>

      <div class="flex flex-row">
        <nav-category
          v-for="nav_item in navbar_list"
          :key="nav_item.text"
          v-bind="nav_item"
        ></nav-category>
      </div>
    </div>
  </nav>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link> |
    <router-link :to="{ name: 'Jobs' }">Jobs</router-link> |
    <router-link :to="{ name: 'DbTime' }">DB Time</router-link> |
    <router-link :to="{ name: 'Register' }">Register</router-link> |
    <router-link :to="{ name: 'Login' }">Login</router-link>
  </div>
  <router-view />
</template>

<script>
import NavCategory from "./components/NavCategory.vue";

export default {
  name: "App",
  components: { NavCategory },
  data() {
    return {
      navbar_list: [
        {
          text: "O nás",
          router_name: "About",
          subcategories: ["a", "b", "c"],
        },
        {
          text: "Registrovat",
          router_name: "Register",
          subcategories: ["d", "e", "f"],
        },
      ],
    };
  },
};
</script>



<style>
</style>
