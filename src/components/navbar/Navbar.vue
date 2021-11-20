<template>
  <nav class="mb-6 shadow-xl">
    <div class="flex bg-theorange h-16 justify-center">
      <router-link to="/" class="pl-4 h-full flex-1">
        <img src="/resources/logo_small.webp" alt="logo" class="w-16" />
      </router-link>
      <div class="hidden lg:flex flex-2 justify-center items-center">
        <div class="relative">
          <!-- 15px is half of icon height -->
          <img
            src="/resources/search_icon.svg"
            class="absolute left-2 transform scale-75"
            style="top: calc(50% - 15px)"
          />
          <input
            class="rounded-full p-2 pl-10 w-72 h-9 focus:outline-none"
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
      <div class="pr-8 flex-1 flex justify-end items-center" v-if="logged_in">
        <button
          @click="toggle_user_dropdown"
          class="
            relative
            bg-theyellow
            h-12
            w-32
            min-w-max
            rounded
            flex
            items-center
            justify-end
            hover:ring
            ring-yellow-400
          "
        >
          <div class="mx-4 whitespace-nowrap">{{ user.username }}</div>
          <img
            :src="profile_pic"
            alt="profile pic"
            class="mr-1 w-10 my-1 rounded-full border-2 border-gray-800"
          />
          <transition name="fade">
            <user-menu
              v-show="user_menu_visible"
              class="
                absolute
                top-16
                right-0
                w-48
                bg-theorange
                rounded-lg
                p-4
                shadow-xl
                border border-theorange
                z-40
              "
            ></user-menu>
          </transition>
        </button>
      </div>
      <div class="pr-8 flex-1 flex justify-end items-center gap-4" v-else>
        <profile-button link_target_name="Register">
          Registrovat
        </profile-button>
        <profile-button link_target_name="Login"> Přihlásit </profile-button>
      </div>
      <div class="flex items-center justify-center h-full"></div>
    </div>
    <div
      class="
        categories
        py-1
        flex flex-row
        justify-start
        lg:justify-center
        justify-items-center
        bg-theyellow
        divide-x divide-red-900
        overflow-x-scroll
        lg:overflow-visible
        relative
        z-10
      "
    >
      <nav-category
        class="px-2"
        v-for="(subs, category) in tag_hierarchy"
        :key="category"
        :text="category"
        :subcategories="subs.featured_tags"
      ></nav-category>
    </div>
  </nav>
</template>

<script>
import NavCategory from "./NavCategory.vue";
import ProfileButton from "./ProfileButton.vue";
import UserMenu from "./UserMenu.vue";
import { mapState } from "vuex";

export default {
  components: { NavCategory, ProfileButton, UserMenu },
  computed: {
    logged_in() {
      return this.$store.state.logged_in;
    },
    ...mapState({
      user: "user_data",
      tag_hierarchy: "tag_hierarchy",
    }),
  },
  data() {
    return {
      user_menu_visible: false,
      profile_pic: "/resources/profile_pic.webp",
      search_term: "",
    };
  },

  methods: {
    search_clicked() {
      // neřešeno router-linkem kvůli mazaní hledacího pole
      this.$router.push({ name: "Auctions", query: { q: this.search_term } });
      this.search_term = "";
    },

    toggle_user_dropdown() {
      this.user_menu_visible = !this.user_menu_visible;
    },

    handleFocusOut() {
      this.user_menu_visible = false;
    },
  },
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.categories::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.categories {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>