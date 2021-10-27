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

  <footer class="w-full mt-6 bg-bgcolor p-6">
    <div class="flex justify-center">
      <div class="w-16 h-16 bg-red-700 mx-4 rounded">footer1</div>
      <div class="w-16 h-16 bg-red-700 mx-4 rounded">
        <img src="/resources/vut.jpg" alt="vut image" />
      </div>
      <div class="w-16 h-16 bg-red-700 mx-4 rounded">footer3</div>
    </div>
  </footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import SingleView from "./components/SingleView.vue";
import FilterView from "./components/FilterView.vue";

export default {
  name: "App",
  components: { Navbar, SingleView, FilterView },
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
