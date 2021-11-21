<template>
  <h1 class="text-2xl mb-2">Žádosti o přijetí</h1>
  <generic-list
    :rows="users"
    :header="header"
    @checkChange="handleCheckChange"
    checkboxes
  ></generic-list>
  <button
    @click="confirmUsers"
    class="m-6 p-2 px-4 bg-theorange rounded text-xl"
  >
    Potvrdit přijetí
  </button>
</template>

<script>
import { mapActions } from "vuex";

import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      header: [
        ["ID", "iduzivatele"],
        ["ID aukce", "cisloaukce"],
        ["Schválen", "schvalen_text"],
        ["Název aukce", "nazev"],
        ["Stav aukce", "stav"],
        ["typ", "typ"],
      ],
      users: [],
    };
  },
  computed: {
    checked_users() {
      return this.users.filter((user) => user.checked);
    },
  },
  methods: {
    ...mapActions(["licit_confirm_user", "new_notif"]),

    handleCheckChange(e) {
      let user = this.users.find((user) => user.id == e.target.value);
      console.log(user);
      user.checked = !user.checked;
    },

    async confirmUsers() {
      for (let user of this.checked_users) {
        // action
        await this.licit_confirm_user({
          auction_id: user.idaukce,
          user_id: user.iduzivatele,
        });
      }

      // reload
      this.get_users();
    },

    get_users() {
      this.$backend_api
        .get("/licit/all-participants")
        .then((query_res) => {
          if (!query_res.data.success) {
            console.log("bad result");
            this.users = [];
            return;
          }
          console.log("res");
          console.log(query_res.data.data);
          query_res.data.data.forEach((user) => {
            user.checked = false;
            user.id = `${user.iduzivatele}-${user.idaukce}`;
            user.schvalen_text = user.schvalen ? "Ano" : "Ne";
          });
          this.users = query_res.data.data;
          console.log("after");
          console.log(query_res.data.data);
        })
        .catch((reason) => {
          console.log(`Get failed: ${reason}`);
          return "error";
        });
    },
  },
  mounted() {
    this.get_users();
  },
};
</script>

<style>
</style>