<template>
  <div class="mb-32 px-3">
    <div class="max-w-7xl mx-auto">
      <div
        class="block fixed z-50"
        style="width: 400px; height: 0px; top: 0px; left: calc(50% - 200px)"
      >
        <div class="flex flex-col gap-4 mt-8">
          <notification
            v-for="notif in notifications"
            :key="notif"
            v-bind="notif"
          >
          </notification>
        </div>
      </div>
      <navbar></navbar>

      <router-view />
    </div>
  </div>
  <wavy-footer></wavy-footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import WavyFooter from "./components/Footer.vue";
import Notification from "./components/Notification.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: { Navbar, WavyFooter, Notification },
  data() {
    return {};
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    },
  },
  methods: {
    ...mapActions(["get_session_info"]),
  },
  created() {
    //this.get_session_info();
  },
};
</script>

<style>
</style>
