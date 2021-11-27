<template>
  <div class="pt-6">
    <div class="max-w-xl min-h-400 mx-2 sm:mx-auto bg-theyellow rounded shadow">
      <div class="py-6 px-8 text-black text-xl border-b border-theorange">
        Přihlásit se
      </div>
      <form
        id="signup-form"
        @submit.prevent="processForm"
        class="flex items-center flex-col gap-6 m-8"
      >
        <div>
          <label class="text-sm font-bold pl-1">Uživatelské jméno</label>
          <input
            v-model="username"
            class="input-field w-72 mb-4"
            type="text"
            placeholder="Michal123"
          />
          <label class="text-sm font-bold pl-1">Heslo</label>
          <input
            v-model="password"
            class="input-field w-72"
            type="password"
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
    <router-link :to="{ name: 'Register' }" class="hover:underline"
      >Ještě nemám účet</router-link
    >
  </p>
</template>

<script>
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
        console.log(this.$route.query.redirect);
        this.$router.push({ name: "Home" }); // redirect home
      } else {
        // error popup
        this.new_notif({
          text: response.message,
          urgency: "error",
        });

        // delete fields
        this.username = "";
        this.password = "";
      }
    },
  },
};
</script>

<style>
</style>