<template>
  <nav class="mb-6 filter drop-shadow">
    <div class="relative bg-theorange h-16">
      <router-link to="/" class="absolute pl-4 h-full">
        <picture>
          <img src="/resources/logo_small.webp" alt="logo" class="w-16" />
        </picture>
      </router-link>
      <div
        class="absolute right-0 pr-8 h-full flex flex-row items-center"
        v-if="logged_in"
      >
        <div @click="toggle_user_dropdown" class="relative">
          <picture>
            <img
              :src="profile_pic"
              alt="profile pic"
              class="ml-4 w-10 rounded-full -my-1"
            />
          </picture>
          <transition name="fade">
            <div
              v-show="user_menu_visible"
              class="
                absolute
                top-16
                right-0
                w-48
                bg-theorange
                rounded-lg
                z-10
                p-4
                shadow-xl
                border border-theorange
              "
            >
              <ul>
                <router-link
                  :to="{ name: 'MyProfile' }">
                  <li
                    class="
                      rounded
                      p-1
                      m-1
                      border border-black
                      bg-theyellow
                      transform hover:scale-105
                      text-center text-gray-800
                    "
                  >
                    Správa účtu
                  </li>
                </router-link>  
                 <li
                  class="
                    rounded
                    p-1
                    m-1
                    border border-black
                    bg-theyellow
                    transform hover:scale-105
                    text-center text-gray-800
                  "
                >
                  Aukce
                </li>
                <li class="
                    rounded
                    p-1
                    m-1
                    transform hover:scale-105
                    border border-black
                    bg-theyellow
                    text-center text-gray-800
                  ">Odhlásit se</li>
                <router-link
                  :to="{ name: 'AddAuction' }"
                >
                  <li class="
                    rounded
                    p-1
                    m-1
                    transform hover:scale-105
                    border border-black
                    bg-theyellow
                    hover:bg-green-500
                    text-center text-gray-800
                  "> + Vytvořit aukci</li>
                </router-link>  
                
              
              </ul>
            </div>
          </transition>
        </div>
      </div>
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
            src="/resources/search_icon.svg"
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
      "
    >
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
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  components: { NavCategory, ProfileButton },
  computed: {
    logged_in() {
      return this.$store.state.logged_in;
    },
    ...mapState({
      user: "user_data",
      admin: "admin",
    }),
    ...mapGetters(["profile_pic"]),
  },
  data() {
    return {
      user_menu_visible: false,

      search_term: "",

      navbar_list: [
        {
          text: "Domy",
          subcategories: ["1+kk", "2+kk", "3+kk", "4+kk"],
        },
        {
          text: "Byty",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Zahrady",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Pozemky",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Komerční",
          subcategories: ["d", "e", "f"],
        },
        {
          text: "Ostatní",
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

    toggle_user_dropdown() {
      this.user_menu_visible = !this.user_menu_visible;
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