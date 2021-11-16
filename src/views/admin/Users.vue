<template>
  <h1 class="text-2xl mb-2">Administrace uživatelů</h1>
  <generic-list
    :rows="users"
    :header="header"
    @checkChange="handleCheckChange"
  ></generic-list>
  <button @click="get_users" class="m-2 px-1 bg-theorange rounded">
    Načíst více
  </button>
  <h2 class="text-lg my-1">Akce</h2>
  <div class="p-1 bg-theyellow rounded">
    Zvolených uživatelů: {{ checked_users.length }}
    <ul>
      <li>
        <input type="radio" value="nazevakce1" v-model="picked_action" />
        <label for="one">Akce 1</label>
      </li>
      <li>
        <input type="radio" value="nazevakce2" v-model="picked_action" />
        <label for="one">Akce 2</label>
      </li>
    </ul>
    <span>Picked: {{ picked_action }}</span>
    <button @click="execAction" class="m-2 px-1 bg-theorange rounded">
      Provést akci
    </button>
  </div>
</template>

<script>
import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      picked_action: "nazevakce1",
      header: [
        ["ID", "id"],
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
  computed: {
    checked_users() {
      return this.users.filter((user) => user.checked);
    },
  },
  methods: {
    handleCheckChange(e) {
      let user = this.users.find((user) => user.id == e.target.value);
      console.log(user);
      user.checked = !user.checked;
    },

    execAction() {
      for (let user of this.checked_users) {
        // action
        user.checked = false;
      }
    },

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
          query_res.data.data.forEach((user) => {
            user.checked = false;
          });
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