<template>
  <h1 class="text-2xl">Admin page</h1>
  <generic-list :rows="users" :header="header"></generic-list>
  <p @click="get_users">gg</p>
</template>

<script>
import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      header: [
        ["ID", "iduzivatele"],
        ["Uživ. jméno", "username"],
        ["Jméno", "jmeno"],
        ["Příjmení", "prijmeni"],
        ["e-mail", "email"],
        ["typ", "typ"],
      ],
      users: [],

      loaded_users: 0,
      load_step: 5,
    };
  },
  computed: {},
  methods: {
    get_users() {
      this.$backend_api
        .get("/admin/users", {
          params: { offset: this.loaded_users, number: this.load_step },
        })
        .then((query_res) => {
          if (!query_res.data.success) {
            console.log("bad result");
            this.users = [];
            return;
          }
          console.log("res");
          console.log(query_res.data.data);
          this.users = this.users.concat(query_res.data.data);
          this.loaded_users += this.load_step;
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