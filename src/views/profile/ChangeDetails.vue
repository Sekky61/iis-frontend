<template>
  <h1 class="text-2xl mb-4">Upravit údaje</h1>
  <div class="flex gap-6">
    <div>
      <div class="mb-4">
        <label class="text-sm font-bold pl-1">Nový email</label>
        <input
          v-model="email"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="name@email.cz"
        />
      </div>

      <div class="mb-4">
        <label class="text-sm font-bold pl-1">Nové jméno</label>
        <input
          v-model="first_name"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="Jirka"
        />
        <label class="text-sm font-bold pl-1">Nové příjmení</label>
        <input
          v-model="last_name"
          class="input-field w-72 mb-4"
          type="text"
          placeholder="Novák"
        />
      </div>
    </div>
    <div>
      <div class="mb-4">
        <label class="text-sm font-bold pl-1">Nové heslo</label>
        <input
          v-model="new_password"
          class="input-field w-72 mb-4"
          type="password"
          placeholder="Heslo"
        />
      </div>
      <label class="text-sm font-bold pl-1">Potvrdit heslo</label>
      <input
        v-model="new_password_confirm"
        class="input-field w-72 mb-4"
        type="password"
        placeholder="Heslo"
      />
    </div>
  </div>
  <hr class="my-4" />
  <div class="mb-4">
    <label class="text-sm font-bold pl-1">Potvrdit změnu heslem</label>
    <input
      v-model="password"
      class="input-field w-72 mb-4"
      type="password"
      placeholder="Heslo"
    />
  </div>
  <button @click="send" class="bg-theorange ml-2 rounded py-2 px-3">
    Potvrdit
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",

      password: "",

      new_password: "",
      new_password_confirm: "",
    };
  },
  methods: {
    ...mapActions(["new_notif", "user_change_user_data"]),

    async send() {
      // todo validation

      // what fields changed:
      let changed_fields = {};
      if (this.first_name != "") {
        changed_fields.jmeno = this.first_name;
      }
      if (this.last_name != "") {
        changed_fields.prijmeni = this.last_name;
      }
      if (this.email != "") {
        changed_fields.email = this.email;
      }

      if (this.new_password != "" || this.new_password_confirm != "") {
        if (this.new_password != this.new_password_confirm) {
          this.new_notif({
            text: "Hesla se neshodují",
            urgency: "error",
          });
          return;
        }
        changed_fields.heslo = this.new_password;
      }

      if (this.password == "") {
        this.new_notif({
          text: "Nebylo zadáno heslo pro potvrzení",
          urgency: "error",
        });
        return;
      }

      const payload = {
        password: this.password,
        user_data: changed_fields,
      };

      const response = await this.user_change_user_data(payload);

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.$router.go(); // todo refetch user data
    },
  },
};
</script>

<style>
</style>