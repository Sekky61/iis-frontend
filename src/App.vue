<template>
  <navbar></navbar>

  <router-view />

  <wavy-footer></wavy-footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import WavyFooter from "./components/Footer.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: { Navbar, WavyFooter },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["set_logged_in"]),
  },
  mounted() {
    console.log("Mounting app");

    this.$backend_api
      .get("/get-session-info")
      .then((response) => {
        console.log("Response txt:");
        console.log(response);
        try {
          // response.data jsou data odpovědi
          let resp_obj = response.data;
          if (resp_obj.success) {
            this.set_logged_in(resp_obj);
          } else {
            console.log("Bad attempt");
            return; // todo show message
          }
        } catch (e) {
          console.log("Response parse error:");
          console.log(e);
        }
      })
      .catch((error) => {
        this.error_message = error;
        if (error.response) {
          // response outside of 2xx
          console.log("Bad login");
        } else if (error.request) {
          // no response
          console.log("No response");
        } else {
          // other error
          console.log("Error", error.message);
        }
      });
  },
};
</script>

<style>
</style>
