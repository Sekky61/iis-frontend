<template>
  <div>
    <div class="max-w-xl min-h-400 mx-2 sm:mx-auto bg-theyellow rounded shadow">
      <div class="py-6 px-8 text-black text-xl border-b border-theorange">
        Registrovat se
      </div>
      <form
        @submit.prevent="processForm"
        class="flex items-center flex-col m-8"
      >
        <div class="flex justify-between mb-4 w-80">
          <div>
            <label class="text-sm font-bold pl-1">Jméno</label>
            <input
              v-model="first_name"
              class="input-field w-36"
              type="text"
              placeholder="Michal"
              @blur.capture="validate_first_name"
              :class="{ 'input-incorrect': !first_name_valid }"
            />
            <span
              :class="
                (this.first_name_valid ? 'text-grey' : 'text-red-500') +
                ' text-xs mt-1 pt-2 pl-3'
              "
            >
              1-31 znaků
            </span>
          </div>
          <div>
            <label class="text-sm font-bold pl-1">Příjmení</label>
            <input
              v-model="last_name"
              class="input-field w-36"
              type="text"
              placeholder="Novák"
              @blur.capture="validate_last_name"
              :class="{ 'input-incorrect': !last_name_valid }"
            />
            <span
              :class="
                (this.last_name_valid ? 'text-grey' : 'text-red-500') +
                ' text-xs mt-1 pt-2 pl-3'
              "
            >
              1-31 znaků
            </span>
          </div>
        </div>
        <div class="mb-4 w-80">
          <label class="text-sm font-bold pl-1">Uživatelské jméno</label>
          <input
            v-model="username"
            class="input-field w-full"
            type="text"
            placeholder="Michal123"
            @blur.capture="validate_username"
            :class="{ 'input-incorrect': !username_valid }"
          />
          <ul class="list-none pt-2 pl-3">
            <li
              v-for="requriement in user_requirements"
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
        <div class="mb-4 w-80">
          <label class="text-sm font-bold pl-1">Email</label>
          <input
            v-model="email"
            class="input-field w-full"
            type="text"
            placeholder="michal@email.cz"
            @blur.capture="validate_email"
            :class="{ 'input-incorrect': !email_valid }"
          />
          <ul class="list-none pt-2 pl-3">
            <li
              v-for="requriement in email_requirements"
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
        <div
          class="
            mt-2
            mb-4
            w-88
            p-4
            border-dashed border-2 border-light-blue-500
            rounded
          "
        >
          <label class="text-sm font-bold pl-1">Heslo</label>
          <input
            v-model="password"
            class="input-field w-full mb-2"
            type="password"
            placeholder="123456"
            @blur.capture="validate_password"
            :class="{ 'input-incorrect': !password_valid }"
          />
          <label class="text-sm font-bold pl-1 mt-2">Potvrdit heslo</label>
          <input
            v-model="confirm_password"
            class="input-field w-full"
            type="password"
            placeholder="123456"
            @blur.capture="validate_confirm_password"
            :class="{ 'input-incorrect': !confirm_password_valid }"
          />
          <ul class="list-none pt-2 pl-3">
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
    <router-link :to="{ name: 'Login' }" class="hover:underline"
      >Už mám účet</router-link
    >
  </p>
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

      username_is_unique: true,
    };
  },
  computed: {
    // a computed getter
    pass_requirements() {
      // `this` points to the vm instance
      return [
        {
          text: "Minimálně 6 písmen, maximálně 63",
          correct: this.length_between(this.password, 6, 63),
        },
        {
          text: "Alespoň jedno číslo a jedno písmeno",
          correct: this.is_alphanum(this.password),
        },
      ];
    },

    passwords_match() {
      return (
        this.password == this.confirm_password && this.password.length != 0
      );
    },

    email_requirements() {
      return [
        {
          text: "Email musí mít mezi 1 až 63 znaků",
          correct: this.length_between(this.email, 1, 63),
        },
        {
          text: "Musí obsahovat znak '@'",
          correct: this.email.includes("@"),
        },
      ];
    },

    user_requirements() {
      return [
        {
          text: "1-31 znaků",
          correct: this.length_between(this.username, 1, 31),
        },
        {
          text: "Musí být unikátní",
          correct: this.username_is_unique,
        },
      ];
    },
  },
  methods: {
    ...mapActions(["register", "new_notif", "user_exists"]),

    // inclusive length check
    length_between(str, a, b) {
      return str.length >= a && str.length <= b;
    },

    is_alphanum(str) {
      return /\d/.test(str) && /[a-zA-Z]/g.test(str);
    },

    // validation methods - computed values evaluate before user stops typing and leaves field
    validate_first_name() {
      const valid = this.first_name.length > 0 && this.first_name.length < 32;
      this.first_name_valid = valid;
    },

    validate_last_name() {
      const valid = this.last_name.length > 0 && this.last_name.length < 32;
      this.last_name_valid = valid;
    },

    async validate_username() {
      const response = await this.user_exists({ username: this.username });
      let exists = false;
      if (response.success) {
        exists = response.data;
      }

      this.username_is_unique = !exists;

      const valid =
        this.username.length > 0 && this.username.length < 32 && !exists;
      this.username_valid = valid;
    },

    validate_password() {
      const valid = Object.values(this.pass_requirements).every(
        (item) => item.correct
      );
      this.password_valid = valid;
    },

    validate_confirm_password() {
      const valid = this.passwords_match;
      this.confirm_password_valid = valid;
    },

    validate_email() {
      const includes_at = this.email.includes("@");
      const len_ok = this.email.length < 64;
      const valid = includes_at && len_ok;
      this.email_valid = valid;
    },

    form_valid() {
      this.validate_first_name();
      this.validate_last_name();
      this.validate_username();
      this.validate_password();
      this.validate_confirm_password();
      this.validate_email();

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
          text: "Špatné vstupy", // todo exact messages
          urgency: "error",
        });

        // delete invalid fields
        if (!this.first_name_valid) {
          this.first_name = "";
        }

        if (!this.last_name_valid) {
          this.last_name = "";
        }

        if (!this.email_valid) {
          this.email = "";
        }

        if (!this.username_valid) {
          this.username = "";
        }

        if (!this.password_valid || !this.confirm_password_valid) {
          this.password = "";
          this.confirm_password = "";
        }

        return;
      }

      const new_user_data = {
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