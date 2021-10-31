<template>
  <h1 class="text-2xl">Admin page</h1>
  <user-list v-bind="users"></user-list>
  <p>gg</p>
</template>

<script>
import UserList from "../components/userlist/UserList.vue";

export default {
  components: { UserList },
  computed: {
    users: function (new_val) {
      this.$backend_api
        .get("/admin/users")
        .then((query_res) => {
          return query_res;
        })
        .catch((reason) => {
          console.log(`Get failed: ${reason}`);
        });
    },
  },
};
</script>

<style>
</style>