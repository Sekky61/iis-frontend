<template>
  <prohlizec></prohlizec>

  <div class="relative bg-red-700 text-white text-center h-12 w-full">
    <div class="p-2 text-xl">Brzy končící aukce</div>
  </div>
  <div class="p-4 grid grid-rows-1 grid-cols-3 gap-4 ml-6 mr-6">
    <auction-teaser v-if="highlighted_auction_1 != null" :auction="highlighted_auction_1"></auction-teaser>
    <auction-teaser v-if="highlighted_auction_2 != null" :auction="highlighted_auction_2"></auction-teaser>
    <auction-teaser v-if="highlighted_auction_3 != null" :auction="highlighted_auction_3"></auction-teaser>
   
  </div>

  
  <!-- <img class="w-48" src="resources/logo_anim.svg" alt="loading" /> -->
  <!-- <span>Loading animation ^^</span> -->
</template>



<script type="module">
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import prohlizec from "../components/prohlizec.vue";
import AuctionTeaser from "../components/auction/AuctionTeaser.vue";  

export default {
  name: "Home",
  components: { prohlizec, AuctionTeaser},
  data() {
    return {

      id1: 1,
      id2: 2,
      id3: 30,
      id4: 31,


      highlighted_auction_1 : null,
      highlighted_auction_2 : null,
      highlighted_auction_3 : null,
      highlighted_auction_4 : null,
    };
  },
  computed: {
    ...mapState({
      logged_in_state: "logged_in",
    }),
    ...mapGetters(["has_admin_rights", "has_licit_rights"]),
  },
  methods: {
    ...mapActions(["set_logged_in", "get_auction"]),
    ...mapMutations(["raise_notif"]),

    async dispatch_load_auction() {
      let auction1_p = this.get_auction({ auction_id: this.id1 });
      let auction2_p = this.get_auction({ auction_id: this.id2 });
      let auction3_p = this.get_auction({ auction_id: this.id3 });
      let auction4_p = this.get_auction({ auction_id: this.id4 });

      const auction1 = await auction1_p;
      const auction2 = await auction2_p;
      const auction3 = await auction3_p;
      const auction4 = await auction4_p;

      if (!auction1.success || !auction2.success || !auction3.success || !auction3.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.highlighted_auction_1 = auction1.data;
      this.highlighted_auction_2 = auction2.data;
      this.highlighted_auction_3 = auction3.data;
      this.highlighted_auction_4 = auction4.data;
    },
    mounted() {
      this.load_auction();
    },


    toggle_admin() {
      if (this.user_type == "admin") {
        this.set_logged_in(this.data_user);
      } else {
        this.set_logged_in(this.data_admin);
      }
    },

    toggle_licit() {
      if (this.user_type == "licitator") {
        this.set_logged_in(this.data_user);
      } else {
        this.set_logged_in(this.data_licit);
      }
    },
  },
  mounted(){
    this.dispatch_load_auction();
  }
};
</script>
