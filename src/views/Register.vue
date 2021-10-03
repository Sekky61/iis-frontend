<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto">
      <div class="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
        <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter">
          Registrace
        </div>
        <form id="signup-form" @submit.prevent="processForm" class="m-8">
          <div class="flex mb-4">
            <div class="w-1/2 mr-1">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="first_name"
                >Jméno</label
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
                id="first_name"
                type="text"
                placeholder="Vaše křestní jméno"
                v-model="first_name"
                @blur="validate_first_name"
                :class="{ 'border-red-500': !fname_valid }"
              />
            </div>
            <div class="w-1/2 ml-1">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="last_name"
                >Příjmení</label
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
                id="last_name"
                type="text"
                placeholder="Vaše příjmení"
                v-model="last_name"
                @blur="validate_last_name"
                :class="{ 'border-red-500': !lname_valid }"
              />
            </div>
          </div>
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
              @blur="validate_username"
              :class="{ 'border-red-500': !uname_valid }"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="email"
              >Email</label
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
              id="email"
              placeholder="Váš email"
              v-model="email"
              @blur="validate_email"
              :class="{ 'border-red-500': !email_valid }"
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
              @blur="validate_password"
              :class="{ 'border-red-500': !pass_valid }"
            />
            <ul class="list-none">
              <li
                v-for="txt in pass_requirements"
                :key="txt"
                class="text-grey text-xs mt-1"
              >
                {{ txt }}
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-center my-4">
            <button
              class="
                bg-blue
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
              Registrovat
            </button>
          </div>
        </form>
      </div>
    </div>
    <p class="text-center my-4">
      <router-link :to="{ name: 'Login' }">Už mám účet</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pass_requirements: [
        "Minimálně 6 písmen",
        "Alespoň jedno číslo a jedno písmeno",
      ],

      first_name: "",
      last_name: "",
      username: "",
      password: "",
      email: "",

      fname_valid: true,
      lname_valid: true,
      uname_valid: true,
      pass_valid: true,
      email_valid: true,
    };
  },

  methods: {
    validate_first_name() {
      this.fname_valid = this.first_name !== "";
    },

    validate_last_name() {
      this.lname_valid = this.last_name !== "";
    },

    validate_username() {
      this.uname_valid = this.username !== "";
    },

    validate_password() {
      this.pass_valid = this.password.length >= 6;
    },

    validate_email() {
      this.email_valid = this.email !== "";
    },

    processForm: function () {
      let valid = this.form_valid();
      if (!valid) {
        return;
      }

      let new_user_data = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        password: this.password,
        email: this.email,
      };

      axios
        .post(this.$backend_url + "/api", new_user_data)
        .then(function (response) {
          console.log("Response:");
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    form_valid() {
      this.validate_first_name();
      this.validate_last_name();
      this.validate_username();
      this.validate_password();
      this.validate_email();

      return (
        this.fname_valid &&
        this.lname_valid &&
        this.uname_valid &&
        this.pass_valid &&
        this.email_valid
      );
    },
  },
};
</script>

<style>
</style>