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
              <input-field
                class="w-full mb-4"
                v-bind="first_name_field"
                @fieldchange="change_field(first_name_field, $event)"
                @blur.capture="validate_first_name"
                :class="{ wrong: !fname_valid }"
              >
              </input-field>
            </div>
            <div class="w-1/2 ml-1">
              <input-field
                class="w-full mb-4"
                v-bind="last_name_field"
                @fieldchange="change_field(last_name_field, $event)"
                @blur.capture="validate_last_name"
                :class="{ wrong: !lname_valid }"
              >
              </input-field>
            </div>
          </div>
          <div class="mb-4">
            <input-field
              class="w-full mb-4"
              v-bind="username_field"
              @fieldchange="change_field(username_field, $event)"
              @blur.capture="validate_username"
              :class="{ wrong: !uname_valid }"
            >
            </input-field>
          </div>
          <div class="mb-4">
            <input-field
              class="w-full mb-4"
              v-bind="email_field"
              @fieldchange="change_field(email_field, $event)"
              @blur.capture="validate_email"
              :class="{ wrong: !email_valid }"
            >
            </input-field>
          </div>
          <div class="mb-4">
            <input-field
              class="w-full mb-4"
              v-bind="password_field"
              @fieldchange="change_field(password_field, $event)"
              @blur.capture="validate_password"
              :class="{ wrong: !pass_valid }"
            >
            </input-field>
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
import InputField from "../../components/InputField.vue";
import SubmitButton from "../../components/SubmitButton.vue";

export default {
  components: { InputField, SubmitButton },
  data() {
    return {
      first_name_field: {
        label: "Jméno",
        placeholder: "Michal",
        value: "",
        type: "text",
      },
      last_name_field: {
        label: "Příjmení",
        placeholder: "Novák",
        value: "",
        type: "text",
      },
      username_field: {
        label: "Uživatelské jméno",
        placeholder: "Michal123",
        value: "",
        type: "text",
      },
      password_field: {
        label: "Heslo",
        placeholder: "123456",
        value: "",
        type: "password",
      },
      email_field: {
        label: "Email",
        placeholder: "michal@email.cz",
        value: "",
        type: "text",
      },

      fname_valid: true,
      lname_valid: true,
      uname_valid: true,
      email_valid: true,

      pass_valid: true,
      pass_good_len: true,
      pass_contains_letter_and_number: true,
    };
  },
  computed: {
    // a computed getter
    pass_requirements() {
      // `this` points to the vm instance
      return [
        { text: "Minimálně 6 písmen", correct: this.pass_good_len },
        {
          text: "Alespoň jedno číslo a jedno písmeno",
          correct: this.pass_contains_letter_and_number,
        },
      ];
    },
  },
  methods: {
    change_field(obj, new_val) {
      obj.value = new_val;
    },

    // validation methods - computed values evaluate before user stops typing
    validate_first_name() {
      this.fname_valid = this.first_name_field.value !== "";
    },

    validate_last_name() {
      this.lname_valid = this.last_name_field.value !== "";
    },

    validate_username() {
      this.uname_valid = this.username_field.value !== "";
    },

    validate_password() {
      this.pass_good_len = this.password_field.value.length >= 6;
      this.pass_contains_letter_and_number =
        /\d/.test(this.password_field.value) &&
        /[a-zA-Z]/g.test(this.password_field.value); // todo check, revise
      this.pass_valid =
        this.pass_good_len && this.pass_contains_letter_and_number;
    },

    validate_email() {
      this.email_valid = this.email_field.value !== "";
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

    processForm: function () {
      let valid = this.form_valid();
      if (!valid) {
        return;
      }

      let new_user_data = {
        first_name: this.first_name_field.value,
        last_name: this.last_name_field.value,
        username: this.username_field.value,
        password: this.password_field.value,
        email: this.email_field.value,
      };

      this.$backend_api
        .post("/register", new_user_data)
        .then((response) => {
          console.log("Response:");
          this.$router.push({ name: "Home" });
          console.log(response);
        })
        .catch((error) => {
          console.log(error); // todo napsat co je spatne, vymazat
        });
    },
  },
};
</script>

<style>
</style>