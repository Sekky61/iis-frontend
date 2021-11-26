<template>
  <h2 class="text-lg mt-2">Aukce, kterých se účastním</h2>
  <generic-list :rows="auctions" :header="header" auctionLink></generic-list>
</template>

<script>
import { mapActions } from "vuex";
import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      auctions: [],

      header: [
        ["Název", "nazev"],
        ["Vyvolávací cena", "cena"],
        ["Schválen", "schvalen"],
        ["Autor", "autorusername"],
        ["Pravidlo", "pravidlo"],
        ["Typ", "typ"],
        ["Stav", "stav"],
      ],
    };
  },
  methods: {
    ...mapActions(["new_notif", "load_auctions_user_participates"]),

    async load_auctions() {
      const response = await this.load_auctions_user_participates();

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.auctions = response.data;
    },
  },
  mounted() {
    this.load_auctions();
  },
};
</script>

<style>
</style>