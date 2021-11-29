<template>
  <!-- výpis aukcí na základě stavu a zvolených tagu, v kategoriích se jedná o prostřední pruh (bez filtru) -->
  <h1 class="text-3xl p-4">
    {{ category ? "Kategorie " : "Všechny aukce " }}{{ category }}
    {{ subcategory ? "-" : "" }} {{ subcategory }}
  </h1>
  <div class="flex flex-col gap-2">
    <auction-item
      v-for="item in filtered_auctions"
      :key="item.cisloaukce"
      :auction="item"
    ></auction-item>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AuctionItem from "../components/auction/AuctionItem.vue";

export default {
  components: { AuctionItem },
  props: ["category", "subcategory", "filterObj"],
  data() {
    return {
      auctions: [],
    };
  },
  computed: {
    filtered_auctions() {
      return this.auctions.filter((au) => this.passes(au, this.filterObj));
    },
  },
  methods: {
    ...mapActions(["user_can_join_auctions", "get_auctions", "new_notif"]),

    // filter function
    passes(auction, filterObj) {
      if (
        (!filterObj.schvalene && auction.stav == "schvalena") ||
        (!filterObj.probihajici && auction.stav == "probihajici") ||
        (!filterObj.ukoncene && auction.stav == "ukoncena") ||
        (!filterObj.uzavrene && auction.pravidlo == "uzavrena") ||
        (!filterObj.otevrene && auction.pravidlo == "otevrena") ||
        (!filterObj.nabidkove && auction.typ == "nabidkova") ||
        (!filterObj.poptavkove && auction.typ == "poptavkova")
      ) {
        return false;
      }

      if (filterObj.tagy.length > 0) {
        if (!auction.tagy) {
          return false;
        }
        let includes_all_tags = filterObj.tagy.every((tag) =>
          auction.tagy.includes(tag)
        );

        if (!includes_all_tags) {
          return false;
        }
      }

      if (filterObj.query != "") {
        let lowercase_query = filterObj.query.toLowerCase();
        let lowercase_name = auction.nazev.toLowerCase();
        if (!lowercase_name.includes(lowercase_query)) {
          return false;
        }
      }

      return true;
    },

    async load_auctions() {
      let response = await this.get_auctions();

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      let auctions = response.data;
      auctions.forEach((auction) => (auction.can_join = false));

      if (!this.$store.state.logged_in) {
        this.auctions = auctions;
        return;
      }

      // logged in, check if can join

      const new_ids = auctions.map((auction) => auction.cisloaukce);
      const can_joins = await this.user_can_join_auctions({
        auctions: new_ids,
      });

      if (!can_joins.success) {
        this.auctions = auctions;
        return;
      }

      can_joins.data.forEach((can_join) => {
        let auction_id = can_join.cisloaukce;
        let found_auction = auctions.filter((auction) => {
          return auction.cisloaukce == auction_id;
        });
        if (found_auction.length == 1) {
          found_auction[0].can_join = can_join.can_join;
        }
      });

      this.auctions = auctions;
    },
  },
  mounted() {
    this.load_auctions();
  },
};
</script>

<style>
</style>