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
  <div class="p-2 bg-theyellow rounded">
    <div class="grid grid-cols-2">
      <div class="mr-4">
        <span> Zvolených uživatelů: {{ checked_users.length }} </span>
        <ul>
          <li>
            <input type="radio" value="set_user_type" v-model="picked_action" />
            <label>Změnit typ uživatele</label>
          </li>
          <li>
            <input type="radio" value="edit_user" v-model="picked_action" />
            <label>Upravit uživatele</label>
          </li>
          <li>
            <input type="radio" value="delete_user" v-model="picked_action" />
            <label>Smazat uživatele</label>
          </li>
        </ul>
      </div>
      <div>
        <div v-if="picked_action == 'set_user_type'">
          <ul>
            <li>
              <input type="radio" value="uzivatel" v-model="user_type_input" />
              <label for="one">Uživatel</label>
            </li>
            <li>
              <input type="radio" value="licitator" v-model="user_type_input" />
              <label for="one">Licitátor</label>
            </li>
            <li>
              <input type="radio" value="admin" v-model="user_type_input" />
              <label for="one">Admin</label>
            </li>
          </ul>
        </div>
        <div v-else-if="picked_action == 'delete_user'"></div>
        <div v-else-if="picked_action == 'edit_user'"></div>
        <div v-else>Error</div>
      </div>
    </div>
    <span>Picked: {{ picked_action }}</span>
    <button @click="execAction" class="m-2 px-1 bg-theorange rounded">
      Provést akci
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      picked_action: "set_user_type",
      user_type_input: "uzivatel",

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
    ...mapActions(["change_user_data", "new_notif"]),

    handleCheckChange(e) {
      let user = this.users.find((user) => user.id == e.target.value);
      console.log(user);
      user.checked = !user.checked;
    },

    execAction() {
      let action;
      if (this.picked_action == "set_user_type") {
        action = this.set_user_type;
      } else if (this.picked_action == "delete_user") {
        action = this.delete_user;
      } else if (this.picked_action == "edit_user") {
        action = this.delete_user;
      } else {
        return;
      }

      for (let user of this.checked_users) {
        // action
        action(user);
        user.checked = false;
      }
    },

    async set_user_type(user) {
      console.log(`Set user type ${this.user_type_input} to ${user.id}`); // /admin/change-user-data

      const response = await this.change_user_data({
        id: user.id,
        user_data: { typ: this.user_type_input },
      });

      if (response.success) {
        this.new_notif({
          text: response.message,
          urgency: "success",
        });
      } else {
        // error popup
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }
    },

    delete_user(user) {
      console.log(`Deleting user ${user.id}`); // /admin/delete-user
    },

    edit_user(user) {
      console.log(`Editing user ${user.id}`); // /admin/change-user-data
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