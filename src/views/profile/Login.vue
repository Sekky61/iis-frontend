<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto">
      <div class="w-5/6 lg:w-1/2 mx-auto bg-theyellow rounded shadow">
        <div class="py-4 px-8 text-black text-xl border-b border-theorange">
          Přihlásit se
        </div>
        <form id="signup-form" @submit.prevent="processForm" class="m-8">
          <label class="text-sm font-bold pl-1">Uživatelské jméno</label>
          <input
            v-model="username"
            class="input-field"
            type="text"
            placeholder="Michal123"
          />
          <div class="mb-4">
            <label class="text-sm font-bold pl-1">Heslo</label>
            <input
              v-model="password"
              class="input-field"
              type="text"
              placeholder="Heslo123"
            />
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
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login", "new_notif"]),

    change_field(obj, new_val) {
      obj.value = new_val;
    },

    async processForm() {
      let login_data = {
        username: this.username,
        password: this.password,
      };

      const response = await this.login(login_data);

      if (response.success) {
        this.new_notif({
          text: response.message,
          urgency: "success",
        });
        this.$router.push({ name: "Home" }); // redirect home
      } else {
        // error popup
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>