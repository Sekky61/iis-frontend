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

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      fill="#fcaf38"
      fill-opacity="1"
      d="M0,160L34.3,170.7C68.6,181,137,203,206,197.3C274.3,192,343,160,411,138.7C480,117,549,107,617,133.3C685.7,160,754,224,823,240C891.4,256,960,224,1029,213.3C1097.1,203,1166,213,1234,197.3C1302.9,181,1371,139,1406,117.3L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
    ></path>
  </svg>
  <footer class="w-full bg-red-secondary p-6">
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
