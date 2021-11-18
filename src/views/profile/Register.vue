<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto">
      <div class="w-5/6 lg:w-1/2 mx-auto bg-theyellow rounded shadow">
        <div class="py-4 px-8 text-black text-xl border-b border-theorange">
          Registrace
        </div>
        <form id="signup-form" @submit.prevent="processForm" class="m-8">
          <div class="flex mb-4">
            <div class="w-1/2 mr-1">
              <label class="text-sm font-bold pl-1">Jméno</label>
              <input
                v-model="first_name"
                class="input-field"
                type="text"
                placeholder="Michal"
                @blur.capture="validate_first_name"
                :class="{ 'input-incorrect': !first_name_valid }"
              />
            </div>
            <div class="w-1/2 ml-1">
              <label class="text-sm font-bold pl-1">Příjmení</label>
              <input
                v-model="last_name"
                class="input-field"
                type="text"
                placeholder="Novák"
                @blur.capture="validate_last_name"
                :class="{ 'input-incorrect': !last_name_valid }"
              />
            </div>
          </div>
          <div class="mb-4">
            <label class="text-sm font-bold pl-1">Uživatelské jméno</label>
            <input
              v-model="username"
              class="input-field"
              type="text"
              placeholder="Michal123"
              @blur.capture="validate_username"
              :class="{ 'input-incorrect': !username_valid }"
            />
          </div>
          <div class="mb-4">
            <label class="text-sm font-bold pl-1">Email</label>
            <input
              v-model="email"
              class="input-field"
              type="text"
              placeholder="michal@email.cz"
              @blur.capture="validate_email"
              :class="{ 'input-incorrect': !email_valid }"
            />
          </div>
          <div class="mb-4">
            <label class="text-sm font-bold pl-1">Heslo</label>
            <input
              v-model="password"
              class="input-field"
              type="password"
              placeholder="123456"
              @blur.capture="validate_password"
              :class="{ 'input-incorrect': !password_valid }"
            />
            <label class="text-sm font-bold pl-1 mt-2">Potvrdit heslo</label>
            <input
              v-model="confirm_password"
              class="input-field"
              type="password"
              placeholder="123456"
              @blur.capture="validate_confirm_password"
              :class="{ 'input-incorrect': !confirm_password_valid }"
            />
            <ul class="list-none pt-1 pl-3">
              <li
                v-for="requriement in pass_requirements"
                :key="requriement"
                :class="
                  (requriement.correct ? 'text-grey' : 'text-red-500') +
                  ' text-xs mt-1'
                "
              >
                {{ requriement.text }}
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-center my-4">
            <submit-button>Registrovat</submit-button>
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
import { mapActions } from "vuex";
import SubmitButton from "../../components/SubmitButton.vue";

export default {
  components: { SubmitButton },
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",

      first_name_valid: true,
      last_name_valid: true,
      username_valid: true,
      email_valid: true,
      password_valid: true,
      confirm_password_valid: true,
    };
  },
  computed: {
    // a computed getter
    pass_requirements() {
      // `this` points to the vm instance
      return [
        { text: "Minimálně 6 písmen", correct: this.password_length },
        {
          text: "Alespoň jedno číslo a jedno písmeno",
          correct: this.password_alphanum,
        },
        {
          text: "Hesla se musí shodovat",
          correct: this.passwords_match,
        },
      ];
    },

    password_length() {
      return this.password.length >= 6;
    },

    password_alphanum() {
      return /\d/.test(this.password) && /[a-zA-Z]/g.test(this.password);
    },

    passwords_match() {
      return (
        this.password == this.confirm_password && this.password.length != 0
      );
    },
  },
  methods: {
    ...mapActions(["register", "new_notif"]),

    // validation methods - computed values evaluate before user stops typing and leaves field
    validate_first_name() {
      this.first_name_valid = this.first_name !== "";
    },

    validate_last_name() {
      this.last_name_valid = this.last_name !== "";
    },

    validate_username() {
      this.username_valid = this.username !== "";
    },

    validate_password() {
      // todo check, revise
      this.password_valid = this.password_alphanum && this.password_length;
    },

    validate_confirm_password() {
      this.confirm_password_valid = this.passwords_match;
    },

    validate_email() {
      this.email_valid = this.email.includes("@");
    },

    form_valid() {
      this.validate_first_name();
      this.validate_last_name();
      this.validate_username();
      this.validate_password();
      this.validate_confirm_password();
      this.validate_email();

      // todo messages here

      return (
        this.first_name_valid &&
        this.last_name_valid &&
        this.username_valid &&
        this.password_valid &&
        this.confirm_password_valid &&
        this.email_valid
      );
    },

    async processForm() {
      let valid = this.form_valid();
      if (!valid) {
        this.new_notif({
          text: "Špatné vstupy",
          urgency: "error",
        });
        return;
      }

      let new_user_data = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        password: this.password,
        email: this.email,
      };

      const response = await this.register(new_user_data);

      if (response.success) {
        this.new_notif({
          text: response.message,
          urgency: "success",
        });
        this.$router.push({ name: "Login" }); // redirect to login
      } else {
        // todo empty fields
        this.new_notif({
          text: response.message, // todo validation messages
          urgency: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>