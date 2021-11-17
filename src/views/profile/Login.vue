<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto">
      <div class="w-5/6 lg:w-1/2 mx-auto bg-theyellow rounded shadow">
        <div class="py-4 px-8 text-black text-xl border-b border-theorange">
          Přihlásit se
        </div>
        <form id="signup-form" @submit.prevent="processForm" class="m-8">
          <input-field
            class="w-full mb-4"
            v-bind="username_field"
            @fieldchange="change_field(username_field, $event)"
          >
          </input-field>
          <div class="mb-4">
            <input-field
              class="w-full"
              v-bind="password_field"
              @fieldchange="change_field(password_field, $event)"
            >
            </input-field>
          </div>
          <div class="flex items-center justify-center my-4">
            <submit-button>Přihlásit se</submit-button>
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
// todo @keyup.enter="processForm" causes double send of form
import InputField from "../../components/InputField.vue";
import SubmitButton from "../../components/SubmitButton.vue";

import { mapActions } from "vuex";

export default {
  components: { InputField, SubmitButton },
  data() {
    return {
      username_field: {
        label: "Uživatelské jméno",
        placeholder: "Petr00",
        value: "",
        type: "text",
      },

      password_field: {
        label: "Heslo",
        placeholder: "123456",
        value: "",
        type: "password",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),

    change_field(obj, new_val) {
      obj.value = new_val;
    },

    async processForm() {
      let login_data = {
        username: this.username_field.value,
        password: this.password_field.value,
      };

      const success = await this.login(login_data);

      if (success) {
        this.$store.dispatch("new_notif", {
          text: `Přihlášen ${login_data.username}`,
          urgency: "success",
        });
        this.$router.push({ name: "Home" }); // redirect home
      } else {
        // error popup
        this.$store.dispatch("new_notif", {
          text: "Neplatný login",
          urgency: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>