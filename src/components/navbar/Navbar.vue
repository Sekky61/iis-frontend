<template>
  <nav class="mb-6 shadow-xl">
    <div class="flex bg-theorange h-16 items-center justify-center">
      <router-link to="/" class="pl-4 h-full">
        <picture>
          <img src="/resources/logo_small.webp" alt="logo" class="w-16" />
        </picture>
      </router-link>
      <div class="relative mx-auto">
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
      <div class="pr-8 my-2" v-if="logged_in">
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
            justify-center
          "
        >
          <div class="mx-4 whitespace-nowrap">{{ user.username }}</div>
          <img
            :src="profile_pic"
            alt="profile pic"
            class="mr-1 w-10 my-1 rounded-full border-2 border-gray-800"
          />
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
                p-4
                shadow-xl
                border border-theorange
                z-40
              "
            >
              <ul>
                <router-link
                  v-if="user_type == 'licitator'"
                  :to="{ name: 'Home' }"
                >
                  <li
                    class="
                      rounded
                      p-1
                      m-1
                      border border-black
                      bg-theyellow
                      transform
                      hover:scale-105
                      text-center text-gray-800
                    "
                  >
                    Licitátor
                  </li>
                </router-link>
                <router-link
                  v-if="user_type == 'admin'"
                  :to="{ name: 'Admin' }"
                >
                  <li
                    class="
                      rounded
                      p-1
                      m-1
                      border border-black
                      bg-theyellow
                      transform
                      hover:scale-105
                      text-center text-gray-800
                    "
                  >
                    Admin
                  </li>
                </router-link>
                <router-link :to="{ name: 'MyProfile' }">
                  <li
                    class="
                      rounded
                      p-1
                      m-1
                      border border-black
                      bg-theyellow
                      transform
                      hover:scale-105
                      text-center text-gray-800
                    "
                  >
                    Správa účtu
                  </li>
                </router-link>
                <router-link :to="{ name: 'AuctionList' }">
                  <li
                    class="
                      rounded
                      p-1
                      m-1
                      border border-black
                      bg-theyellow
                      transform
                      hover:scale-105
                      text-center text-gray-800
                    "
                  >
                    Aukce
                  </li>
                </router-link>
                <li
                  class="
                    rounded
                    p-1
                    m-1
                    transform
                    hover:scale-105
                    border border-black
                    bg-theyellow
                    text-center text-gray-800
                  "
                  @click="logout"
                >
                  Odhlásit se
                </li>
                <router-link :to="{ name: 'AddAuction' }">
                  <li
                    class="
                      rounded
                      p-1
                      m-1
                      transform
                      hover:scale-105
                      border border-black
                      bg-theyellow
                      hover:bg-green-500
                      text-center text-gray-800
                    "
                  >
                    + Vytvořit aukci
                  </li>
                </router-link>
              </ul>
            </div>
          </transition>
        </button>
      </div>
      <div class="absolute right-0 pr-8 my-4" v-else>
        <profile-button link_target_name="Register" class="px-4">
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
        :subcategories="subs.tags"
      ></nav-category>
    </div>
  </nav>
</template>

<script>
import NavCategory from "./NavCategory.vue";
import ProfileButton from "./ProfileButton.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: { NavCategory, ProfileButton },
  computed: {
    logged_in() {
      return this.$store.state.logged_in;
    },
    ...mapState({
      user: "user_data",
      tag_hierarchy: "tag_hierarchy",
    }),
    ...mapGetters(["user_type"]),
  },
  data() {
    return {
      user_menu_visible: false,
      profile_pic: "/resources/profile_pic.webp",
      search_term: "",
    };
  },

  methods: {
    ...mapActions(["log_out"]),

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

    logout: function () {
      this.$backend_api
        .post("/logout")
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            // response.data jsou data odpovědi
            let resp_obj = response.data;
            if (resp_obj.success) {
              this.log_out(resp_obj);
              this.$router.push({ name: "Home" }); // redirect home
            } else {
              console.log("Bad attempt");
              return; // todo show message
            }
          } catch (e) {
            console.log("Response parse error:");
            console.log(e);
          }
        })
        .catch((error) => {
          this.error_message = error;
          if (error.response) {
            // response outside of 2xx
            console.log("Bad logout");
          } else if (error.request) {
            // no response
            console.log("No response");
          } else {
            // other error
            console.log("Error", error.message);
          }
        });
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