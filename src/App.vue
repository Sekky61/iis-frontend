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
          Tady bude logo
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
        <ul class="flex flex-col lg:flex-row list-none">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Vyhledávání..."
              aria-label=" Search"
            />
            <button
              class="fab fa-twitter text-lg leading-lg text-white opacity-75"
              type="submit"
            >
              Potvrdit
            </button>
          </form>
          <li class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
              href="#pablo"
            >
              <i
                class="
                  fab
                  fa-facebook-square
                  text-lg
                  leading-lg
                  text-white
                  opacity-75
                "
              /><span class="ml-2">Sledované aukce</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
              href="#pablo"
            >
              <i
                class="fab fa-twitter text-lg leading-lg text-white opacity-75"
              /><span class="ml-2">Registrace</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
              href="#pablo"
            >
              <i
                class="
                  fab
                  fa-pinterest
                  text-lg
                  leading-lg
                  text-white
                  opacity-75
                "
              /><span class="ml-2">Přihlášení</span>
            </a>
          </li>
        </ul>
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


<style>
#app {
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
}
</style>
