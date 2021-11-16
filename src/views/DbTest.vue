<template>
  <h1>DB test</h1>
  <p>{{ time_resp }}</p>
</template>

<script>
export default {
  name: "DBTime",
  mounted() {
    this.load_db_demo();
  },

  data() {
    return {
      time_resp: "No response",
    };
  },

  methods: {
    load_db_demo() {
      this.$backend_api
        .get("/admin/db-status")
        .then((response) => {
          console.log(`HEY`);
          console.dir(response);
          let resp_obj = response.data;
          if (resp_obj.success) {
            this.time_resp = "OKbro";
          } else {
            console.log("Bad attempt");
            return; // todo show message
          }
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