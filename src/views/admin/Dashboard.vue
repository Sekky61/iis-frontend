<template>
  <!-- prostředí pro uživatele typu admin  -->
  <h1 class="text-3xl pb-4">Dashboard</h1>
  <h2 class="text-xl pb-2">Status</h2>
  <div class="bg-theorange rounded p-2 ml-2 mb-4 w-32 h-16">
    <div class="flex">
      <label class="pr-3">Backend</label
      ><span
        class="w-3 h-3 rounded-full"
        :class="server_status ? 'bg-green-500' : 'bg-red-500'"
      ></span>
    </div>
    <div class="flex items-center">
      <label class="pr-3">DB</label
      ><span
        class="w-3 h-3 rounded-full"
        :class="db_status ? 'bg-green-500' : 'bg-red-500'"
      ></span>
    </div>
  </div>
  <!-- akce, které jsou vyhradně povolené pouze uživateli admin - spravovat uživatele -->
  <h2 class="text-xl pb-2">Akce</h2>
  <router-link
    :to="{ name: 'AdminUsers' }"
    class="ml-2 p-2 bg-theorange rounded px-5 shadow"
  >
    Spravovat uživatele
  </router-link>
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
          console.dir(response);
          let resp_obj = response.data;
          if (resp_obj.success) {
            this.server_status = true;
          } else {
            this.server_status = false;
            return;
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
          console.dir(response);
          let resp_obj = response.data;
          if (resp_obj.success) {
            this.db_status = true;
          } else {
            this.db_status = false;
            return;
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