<template>
  <prohlizec class="my-2"></prohlizec>

  <div class="my-4 bg-red-700 text-white text-center h-12 w-full">
    <div class="p-2 text-xl">Brzy končící aukce</div>
  </div>
  <div class="p-4 grid grid-rows-1 grid-cols-3 gap-4 ml-6 mr-6">
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
