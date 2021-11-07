<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto">
      <div class="w-5/6 lg:w-1/2 mx-auto bg-theyellow rounded shadow">
        <div class="py-4 px-8 text-black text-xl border-b border-theorange">
          Přihlásit se
        </div>
        <form
          id="signup-form"
          @submit.prevent="processForm"
          @keyup.enter="processForm"
          class="m-8"
        >
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
        <div id="error_msg" class="rounded bg-red-500">{{ error_message }}</div>
      </div>
    </div>
    <p class="text-center my-4">
      <router-link :to="{ name: 'Register' }">Ještě nemám účet</router-link>
    </p>
  </div>
</template>

<script>
import InputField from "../../components/InputField.vue";
import SubmitButton from "../../components/SubmitButton.vue";

import { mapActions } from "vuex";

export default {
  components: { InputField, SubmitButton },
  data() {
    return {
      error_message: "",

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
    ...mapActions(["set_logged_in"]),

    change_field(obj, new_val) {
      obj.value = new_val;
    },

    processForm: function () {
      let login_data = {
        username: this.username_field.value,
        password: this.password_field.value,
      };

      this.$backend_api
        .post("/login", login_data)
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            // response.data jsou data odpovědi
            let resp_obj = response.data;
            if (resp_obj.success) {
              this.set_logged_in(resp_obj);
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
            console.log("Bad login");
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
</style>