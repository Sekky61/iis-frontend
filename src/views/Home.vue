<template>
  <!-- domovská stránka: navbar, teaser, footnote, brzo končící aukce -->
  <prohlizec class="h-80 mt-4"></prohlizec>

  <div
    class="
      bg-red-600
      text-white text-center
      h-14
      w-full
      text-xl
      flex
      justify-center
      items-center
      mt-10
      rounded
    "
  >
    Brzy končící aukce
  </div>
  <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
    <auction-teaser
      v-for="auction in auctions"
      :key="auction.cisloaukce"
      :auction="auction"
    ></auction-teaser>
  </div>

  <!-- <img class="w-48" src="resources/logo_anim.svg" alt="loading" /> -->
  <!-- <span>Loading animation ^^</span> -->
</template>



<script type="module">
import { mapMutations, mapActions } from "vuex";
import prohlizec from "../components/prohlizec.vue";
import AuctionTeaser from "../components/auction/AuctionTeaser.vue";

export default {
  name: "Home",
  components: { prohlizec, AuctionTeaser },
  data() {
    return {
      auctions: [],
    };
  },
  methods: {
    ...mapActions(["set_logged_in", "get_ending_auctions"]),
    ...mapMutations(["raise_notif"]),

    async dispatch_load_auction() {
      const response = await this.get_ending_auctions({ number: 3 });

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
    this.dispatch_load_auction();
  },
};
</script>
