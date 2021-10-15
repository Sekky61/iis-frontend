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
      time_resp: 0,
    };
  },

  methods: {
    load_db_demo() {
      this.$backend_api
        .get("/")
        .then(
          function (response) {
            this.time_resp = response.data;
          }.bind(this)
        )
        .catch((reason) => {
          console.log(`Get failed: ${reason}`);
        });
    },
  },
};
</script>

<style>
</style>