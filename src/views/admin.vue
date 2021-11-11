<template>
  <h1 class="text-2xl">Admin page</h1>
  <generic-list v-bind="users"></generic-list>
  <p>gg</p>
</template>

<script>
import GenericList from "../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      header: ["a", "b"],
    };
  },
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