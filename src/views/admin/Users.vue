<template>
  <h1 class="text-2xl mb-2">Administrace uživatelů</h1>
  <generic-list
    :rows="users"
    :header="header"
    @checkChange="handleCheckChange"
    checkboxes
  ></generic-list>
  <span class="inline-block mt-2 rounded bg-theyellow p-2">
    <input
      type="number"
      v-model="load_step"
      class="w-14 h-6 mr-2 rounded px-1"
    />
    <button @click="get_users" class="px-1 bg-theorange rounded">
      Načíst více
    </button>
  </span>
  <h2 class="text-lg mt-4 mb-2">Akce</h2>
  <div class="p-2 bg-theyellow rounded h-80">
    <div class="flex p-4 h-full items-center justify-items-center gap-4">
      <div class="flex-1">
        <div class="text-xl mb-4">
          Zvolených uživatelů: {{ checked_users.length }}
        </div>
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
        <button
          @click="execAction"
          class="m-6 p-2 px-4 bg-theorange rounded text-xl"
        >
          Provést akci
        </button>
      </div>
      <!-- menus for actions -->
      <div class="flex-1">
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
        <div v-else-if="picked_action == 'edit_user'">
          <div v-if="checked_users.length == 1">
            <label class="text-sm font-bold pl-1 mt-2">Jméno</label>
            <input
              v-model="manipulated_user.jmeno"
              class="input-field"
              type="text"
            />
            <label class="text-sm font-bold pl-1 mt-2">Příjmení</label>
            <input
              v-model="manipulated_user.prijmeni"
              class="input-field"
              type="text"
            />
            <label class="text-sm font-bold pl-1 mt-2">Uživ. jméno</label>
            <input
              v-model="manipulated_user.username"
              class="input-field"
              type="text"
            />
            <label class="text-sm font-bold pl-1 mt-2">email</label>
            <input
              v-model="manipulated_user.email"
              class="input-field"
              type="text"
            />
          </div>
          <div v-else>
            <span class="text-xl m-auto">Musí být vybrán jeden uživatel</span>
          </div>
        </div>
        <div v-else-if="picked_action == 'delete_user'"></div>
        <div v-else>Error</div>
      </div>
    </div>
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
      load_step: 50,

      manipulated_user: null,

      first_name_field: "",
      last_name_field: "",
      username_field: "",
      email_field: "",
    };
  },
  computed: {
    checked_users() {
      return this.users.filter((user) => user.checked);
    },
  },
  watch: {
    checked_users(to, from) {
      if (to.length != 1) {
        this.manipulated_user = null;
        return;
      }
      this.manipulated_user = {
        ...to[0],
      }; // copy, not reference
    },
  },
  methods: {
    ...mapActions(["admin_change_user_data", "new_notif", "delete_user"]),

    copy_user_manip() {
      if (this.checked_users.length != 1) {
        this.manipulated_user = null;
        return;
      }

      this.manipulated_user = this.checked_users[0];
    },

    handleCheckChange(e) {
      let user = this.users.find((user) => user.id == e.target.value);
      console.log(user);
      user.checked = !user.checked;
    },

    async execAction() {
      let action;
      if (this.picked_action == "set_user_type") {
        action = this.set_user_type;
      } else if (this.picked_action == "delete_user") {
        action = this.dispatch_delete_user;
      } else if (this.picked_action == "edit_user") {
        await this.set_user_data(this.manipulated_user);

        // reload
        this.users = [];
        this.loaded_users = 0;
        this.get_users();

        return;
      } else {
        return;
      }

      for (let user of this.checked_users) {
        // action
        await action(user);
        //user.checked = false;
      }

      // reload
      this.users = [];
      this.loaded_users = 0;
      this.get_users();
    },

    async set_user_type(user) {
      console.log(`Set user type ${this.user_type_input} to #${user.id}`); // /admin/change-user-data

      const response = await this.admin_change_user_data({
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

    get_user_by_id(id) {
      return this.users.filter((user) => {
        return user.id == id;
      })[0];
    },

    async set_user_data(user) {
      console.log(`Set user data #${user.id}`); // /admin/change-user-data

      // get changes
      const cols = ["jmeno", "prijmeni", "email", "username"]; // columns we detect changes in
      const original_user = this.get_user_by_id(user.id);

      if (!original_user) {
        this.new_notif({
          text: "Chyba",
          urgency: "error",
        });
        return;
      }

      let changes = {};
      for (let col of cols) {
        if (original_user[col] != user[col]) {
          changes[col] = user[col];
        }
      }

      const response = await this.admin_change_user_data({
        id: user.id,
        user_data: changes,
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

    async dispatch_delete_user(user) {
      console.log(`Deleting user #${user.id}`);

      const response = await this.delete_user(user.id);

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