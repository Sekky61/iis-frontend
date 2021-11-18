<template>
  <div>
    <ul>
      <router-link
        v-if="user_type == 'licitator' || user_type == 'admin'"
        :to="{ name: 'LicitDashboard' }"
      >
        <li class="user_menu_button">Licitátor</li>
      </router-link>
      <router-link v-if="user_type == 'admin'" :to="{ name: 'AdminDashboard' }">
        <li class="user_menu_button">Admin</li>
      </router-link>
      <div v-if="user_type == 'licitator' || user_type == 'admin'" class="h-2">
        &nbsp;
      </div>
      <router-link :to="{ name: 'MyProfile' }">
        <li class="user_menu_button">Správa účtu</li>
      </router-link>
      <router-link :to="{ name: 'AuctionList' }">
        <li class="user_menu_button">Aukce</li>
      </router-link>
      <li class="user_menu_button" @click="dispatch_logout">Odhlásit se</li>
      <router-link :to="{ name: 'AddAuction' }">
        <li class="user_menu_button hover:bg-green-400">+ Vytvořit aukci</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["user_type"]),
  },
  methods: {
    ...mapActions(["logout", "new_notif"]),

    async dispatch_logout() {
      const response = await this.logout();

      if (response.success) {
        this.new_notif({
          text: `Odhlášen`,
          urgency: "success",
        });
      } else {
        // error popup
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>