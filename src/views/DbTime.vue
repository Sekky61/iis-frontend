<template>
  <h1>DB time</h1>
  <p>{{ time_resp }}</p>
</template>

<script>
import axios from "axios";

export default {
  name: "DBTime",
  mounted() {
    this.loadUsers();
  },

  data() {
    return {
      time_resp: 0,
    };
  },

  methods: {
    loadUsers() {
      axios.get("http://localhost:3000/api/").then(
        function (response) {
          this.time_resp = response.data;
        }.bind(this)
      );
    },
  },
};
</script>

<style>
</style>