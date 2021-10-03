<template>
  <nav
    class="
      relative
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-3
      bg-red-800
      mb-3
    "
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="
          w-full
          relative
          flex
          justify-between
          lg:w-auto
          px-4
          lg:static
          lg:block
          lg:justify-start
        "
      >
        <a
          class="
            h-24
            text-sm
            font-bold
            leading-relaxed
            inline-block
            mr-4
            py-2
            whitespace-nowrap
            uppercase
            text-white
          "
          href="#pablo"
        >
          <img
            src="resources/logo2.png"
            style="float: left; width: 100px; height: 100px"
          />
        </a>
        <button
          class="
            text-white
            cursor-pointer
            text-xl
            leading-none
            px-3
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            block
            lg:hidden
            outline-none
            focus:outline-none
          "
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <div class="flex flex-col lg:flex-row list-none">
          <form class="d-flex">
            <input
              class="form-control me-2"
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
              Potvrdit
            </button>
          </form>

          <div class="flex">
            <nav-category
              v-for="nav_item in navbar_list"
              :key="nav_item.text"
              :nav_data="nav_item"
            ></nav-category>
          </div>
        </div>
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
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

#nav a.router-link-exact-active {
  color: white;
  background: crimson;
} */
</style>
