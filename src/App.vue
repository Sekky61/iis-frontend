<template>
  <navbar></navbar>

  <router-view />

  <wavy-footer></wavy-footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import WavyFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: { Navbar, WavyFooter },
  data() {
    return {};
  },
};
</script>

<style>
</style>
