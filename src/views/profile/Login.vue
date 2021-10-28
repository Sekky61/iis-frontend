<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto">
      <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
        <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter">
          Přihlásit se
        </div>
        <form id="signup-form" @submit.prevent="processForm" class="m-8">
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="username"
              >Uživatelské jméno</label
            >
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-grey-darker
              "
              id="username"
              placeholder="Vaše uživatelské jméno"
              v-model="username"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password"
              >Heslo</label
            >
            <input
              class="
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-grey-darker
              "
              id="password"
              type="password"
              placeholder="Vaše heslo"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-center my-4">
            <button
              class="
                hover:bg-red-500
                active:bg-red-800
                text-black
                font-bold
                py-2
                px-4
                rounded-full
                border
                mb-6
              "
              type="submit"
            >
              Přihlásit se
            </button>
          </div>
        </form>
      </div>
    </div>
    <p class="text-center my-4">
      <router-link :to="{ name: 'Register' }">Ještě nemám účet</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["set_logged_in"]),

    processForm: function () {
      let login_data = {
        username: this.username,
        password: this.password,
      };

      this.$backend_api
        .post("/login", login_data)
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            console.log("Parsing: ");
            console.log(response.data);
            let resp_obj = response.data;
            console.dir(resp_obj);
            this.set_logged_in(resp_obj);
          } catch (e) {
            console.log("Response parse error:");
            console.log(e);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("Console: Bad login");
            // response outside of 2xx
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
          } else if (error.request) {
            // no response
            //console.log(error.request);
          } else {
            // other error
            console.log("Error", error.message);
          }
          //console.log(error.config);
        });
    },
  },
};
</script>

<style>
</style>