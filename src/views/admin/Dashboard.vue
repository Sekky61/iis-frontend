<template>
  <h1>Dashboard</h1>

  <div class="bg-theorange rounded p-2 m-2 w-64 h-24">
    <div class="flex">
      <label class="pr-1">Backend</label
      ><span
        class="w-4 h-4 rounded-full"
        :class="server_status ? 'bg-green-500' : 'bg-red-500'"
      ></span>
    </div>
    <div class="flex">
      <label class="pr-1">DB</label
      ><span
        class="w-4 h-4 rounded-full"
        :class="db_status ? 'bg-green-500' : 'bg-red-500'"
      ></span>
    </div>
  </div>

  <div class="grid gap-4 grid-cols-4">
    <router-link
      :to="{ name: 'AdminUsers' }"
      class="ml-2 p-2 bg-theorange rounded px-5 shadow"
    >
      Users
    </router-link>
    <router-link
      :to="{ name: 'DbTest' }"
      class="ml-2 p-2 bg-theorange rounded px-5 shadow"
    >
      DB test
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      server_status: false,
      db_status: false,
    };
  },
  mounted() {
    this.get_server_status();
    this.get_db_status();
  },
  methods: {
    get_server_status() {
      this.$backend_api
        .get("/admin/server-status")
        .then((response) => {
          console.log(`HEY`);
          console.dir(response);
          let resp_obj = response.data;
          if (resp_obj.success) {
            this.server_status = true;
          } else {
            this.server_status = false;
            return; // todo show message
          }
        })
        .catch((reason) => {
          this.server_status = false;
        });
    },

    get_db_status() {
      this.$backend_api
        .get("/admin/db-status")
        .then((response) => {
          console.log(`HEY`);
          console.dir(response);
          let resp_obj = response.data;
          if (resp_obj.success) {
            this.db_status = true;
          } else {
            this.db_status = false;
            return; // todo show message
          }
        })
        .catch((reason) => {
          this.db_status = false;
        });
    },
  },
};
</script>

<style>
</style>