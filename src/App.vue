<template>
  <navbar></navbar>

  <filter-view v-if="filter_view">
    <template v-slot:side>
      <router-view name="side" />
    </template>
    <router-view />
  </filter-view>
  <single-view v-else>
    <router-view />
  </single-view>

  <wavy-footer></wavy-footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import SingleView from "./components/SingleView.vue";
import FilterView from "./components/FilterView.vue";
import WavyFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: { Navbar, SingleView, FilterView, WavyFooter },
  data() {
    return {
      single: false,
    };
  },
  computed: {
    filter_view() {
      return this.$store.state.filter_view;
    },
  },
};
</script>

<style>
</style>
