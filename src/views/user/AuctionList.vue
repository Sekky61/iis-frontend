<template>
  <h1 class="text-xl text-center">Seznam mých aukcí</h1>
  <h2 class="text-lg">Probíhající aukce</h2>
  <button @click="dispatch_load_auctions">load</button>
  <div>
    <generic-list :header="auction_header" :rows="auction_data"></generic-list>
  </div>
  <h2 class="text-lg">Skončené aukce</h2>
  <div>
    <generic-list :header="auction_header" :rows="auction_data"></generic-list>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      auction_header: ["Název", "Přihlášených"],
      auction_data: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    };
  },

  computed: {},

  methods: {
    ...mapActions(["new_notif", "load_users_auctions"]), // todo test

    async dispatch_load_auctions() {
      const response = await this.load_users_auctions();

      if (response.success) {
        this.new_notif({
          text: response.message,
          urgency: "success",
        });
      } else {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }
    },
  },
};
</script>

