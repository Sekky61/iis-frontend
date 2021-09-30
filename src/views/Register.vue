<template>
  <div class="w-full bg-grey-lightest pt-16">
    <div class="container mx-auto py-8">
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
                placeholder="Your first name"
                v-model="first_name"
                @blur="validate_first_name"
                :class="{ 'border-red-500': fname_invalid }"
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
                placeholder="Your last name"
                v-model="last_name"
              />
            </div>
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
              placeholder="Your email address"
              v-model="email"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-grey-darker text-sm font-bold mb-2"
              for="password"
              >Password</label
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
              placeholder="Your secure password"
              v-model="pass"
            />
            <p class="text-grey text-xs mt-1">Minimálně 6 písmen</p>
          </div>
          <div class="flex items-center justify-center my-4">
            <button
              class="
                bg-blue
                hover:bg-blue-dark
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
      <a
        href="#"
        class="text-grey-dark text-sm no-underline hover:text-grey-darker"
        >Už mám účet</a
      >
    </p>
  </div>
  <p>The button above has been clicked {{ counter }} times.</p>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      first_name: "",
      last_name: "",
      username: "",
      pass: "",
      email: "",

      counter: 0,

      fname_invalid: false,
    };
  },
  methods: {
    processForm: function () {
      console.log({
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        password: this.pass,
        email: this.email,

        fname_invalid: false,
      });
      alert("Processing!");
    },
    validate_first_name() {
      console.log(`Blurred, -${this.first_name}-`);
      if (this.first_name === "") {
        this.fname_invalid = true;
        this.errors.push("Jméno nesmí být prázdné");
      } else {
        this.fname_invalid = false;
      }
      console.log(`Lmao, ${this.fname_invalid}`);
    },
    form_validator() {
      this.errors = [];

      if (this.first_name === "") {
        e.target.classList.add("border-red-500");
        this.errors.push("Jméno nesmí být prázdné");
      } else {
        e.target.classList.remove("border-red-500");
      }

      if (this.last_name === "") {
        e.target.classList.add("border-red-500");
        this.errors.push("Příjmení nesmí být prázdné");
      } else {
        e.target.classList.remove("border-red-500");
      }

      if (this.email === "") {
        e.target.classList.add("border-red-500");
        this.errors.push("Email nesmí být prázdný");
      } else {
        e.target.classList.remove("border-red-500");
      }

      if (this.username === "") {
        e.target.classList.add("border-red-500");
        this.errors.push("Uživatelské jméno nesmí být prázdné");
        return false;
      } else {
        e.target.classList.remove("border-red-500");
      }

      if (this.password.length() < 6) {
        e.target.classList.add("border-red-500");
        this.errors.push("Heslo musí mít nejméně 6 znaků");
      } else {
        e.target.classList.remove("border-red-500");
      }

      return true;
    },
    handleBlur(e) {
      console.dir(e);
    },
  },
};
</script>

<style>
</style>