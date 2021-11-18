<template>
  <div>
    <ul>
      <router-link
        v-if="user_type == 'licitator' || user_type == 'admin'"
        :to="{ name: 'LicitDashboard' }"
      >
        <li
          class="
            rounded
            p-1
            m-1
            border border-black
            bg-theyellow
            transform
            hover:scale-105
            text-center text-gray-800
          "
        >
          Licitátor
        </li>
      </router-link>
      <router-link v-if="user_type == 'admin'" :to="{ name: 'AdminDashboard' }">
        <li
          class="
            rounded
            p-1
            m-1
            border border-black
            bg-theyellow
            transform
            hover:scale-105
            text-center text-gray-800
          "
        >
          Admin
        </li>
      </router-link>
      <div v-if="user_type == 'licitator' || user_type == 'admin'" class="h-2">
        &nbsp;
      </div>
      <router-link :to="{ name: 'MyProfile' }">
        <li
          class="
            rounded
            p-1
            m-1
            border border-black
            bg-theyellow
            transform
            hover:scale-105
            text-center text-gray-800
          "
        >
          Správa účtu
        </li>
      </router-link>
      <router-link :to="{ name: 'AuctionList' }">
        <li
          class="
            rounded
            p-1
            m-1
            border border-black
            bg-theyellow
            transform
            hover:scale-105
            text-center text-gray-800
          "
        >
          Aukce
        </li>
      </router-link>
      <li
        class="
          rounded
          p-1
          m-1
          transform
          hover:scale-105
          border border-black
          bg-theyellow
          text-center text-gray-800
        "
        @click="dispatch_logout"
      >
        Odhlásit se
      </li>
      <router-link :to="{ name: 'AddAuction' }">
        <li
          class="
            rounded
            p-1
            m-1
            transform
            hover:scale-105
            border border-black
            bg-theyellow
            hover:bg-green-500
            text-center text-gray-800
          "
        >
          + Vytvořit aukci
        </li>
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