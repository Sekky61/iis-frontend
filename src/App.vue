<template>
  <navbar></navbar>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },
};
</script>



<style>
</style>
