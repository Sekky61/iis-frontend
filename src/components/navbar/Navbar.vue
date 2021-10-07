<template>
  <nav class="mb-3 filter drop-shadow sticky top-0">
    <div class="relative bg-red-secondary h-16">
      <router-link to="/" class="absolute pl-4 h-full">
        <picture>
          <img src="resources/logo_small.webp" alt="logo" class="w-14 py-1" />
        </picture>
      </router-link>
      <profile-button
        link_target_name="MyProfile"
        class="absolute right-0 pr-8 my-4"
        v-if="logged_in"
      >
        Můj profil
      </profile-button>
      <div class="absolute right-0 pr-8 my-4" v-else>
        <profile-button link_target_name="Register" class="px-4">
          Registrovat
        </profile-button>
        <profile-button link_target_name="Login"> Přihlásit </profile-button>
      </div>
      <div class="flex items-center justify-center h-full">
        <div class="flex flex-row relative">
          <!-- 15px is half of icon height -->
          <img
            src="resources/search_icon.svg"
            class="absolute left-2 transform scale-75"
            style="top: calc(50% - 15px)"
          />
          <input
            class="rounded-full p-2 pl-10 h-9 focus:outline-none"
            type="search"
            v-model="search_term"
            placeholder="Vyhledávání..."
            aria-label=" Search"
          />
          <button
            class="
              font-bold
              py-2
              px-2
              uppercase
              text-sm text-white
              hover:opacity-75
            "
            @click="search_clicked"
          >
            Vyhledat
          </button>
        </div>
      </div>
    </div>
    <div
      class="
        py-1
        flex flex-row
        justify-center justify-items-center
        bg-red-primary
        divide-x divide-red-900
      "
    >
      <!-- alternatively divide-x divide-red-900 -->
      <nav-category
        class="px-2"
        v-for="nav_item in navbar_list"
        :key="nav_item.text"
        v-bind="nav_item"
      ></nav-category>
    </div>
  </nav>
</template>

<script>
import NavCategory from "./NavCategory.vue";
import ProfileButton from "./ProfileButton.vue";
import { store, mutations } from "../../store";

export default {
  components: { NavCategory, ProfileButton },
  computed: {
    logged_in() {
      return store.logged_in;
    },
  },
  data() {
    return {
      search_term: "",

      navbar_list: [
        {
          text: "Kategorie 1",
          router_name: "About",
          subcategories: ["a", "b", "c"],
        },
        {
          text: "Kategorie 2",
          router_name: "Register",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Kategorie 3",
          router_name: "Register",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Kategorie 4",
          router_name: "Register",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Kategorie 5",
          router_name: "Register",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Kategorie 6",
          router_name: "Register",
          subcategories: ["d", "e", "f"],
        },
      ],
    };
  },
  methods: {
    search_clicked() {
      // neřešeno router-linkem kvůli mazaní hledacího pole
      this.$router.push({ name: "Search", query: { q: this.search_term } });
      this.search_term = "";
    },
  },
};
</script>

<style>
</style>