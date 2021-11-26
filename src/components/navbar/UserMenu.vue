<template>
  <div>
    <ul>
      <router-link v-if="has_licit_rights" :to="{ name: 'LicitDashboard' }">
        <li class="user_menu_button">Licitátor</li>
      </router-link>
      <router-link v-if="has_admin_rights" :to="{ name: 'AdminDashboard' }">
        <li class="user_menu_button">Admin</li>
      </router-link>
      <div v-if="has_licit_rights" class="h-2">&nbsp;</div>
      <router-link :to="{ name: 'AddAuction' }">
        <li class="user_menu_button hover:bg-green-400">+ Vytvořit aukci</li>
      </router-link>
      <router-link :to="{ name: 'MyProfile' }">
        <li class="user_menu_button">Účet</li>
      </router-link>
      <router-link :to="{ name: 'UserAuctionsDashboard' }">
        <li class="user_menu_button">Aukce</li>
      </router-link>
      <li class="user_menu_button" @click="dispatch_logout">Odhlásit se</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["has_admin_rights", "has_licit_rights"]),
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
        this.$router.push({ name: "Home" }); // redirect home
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