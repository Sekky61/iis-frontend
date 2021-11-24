<template>
  <prohlizec></prohlizec>

  <auction-item v-if="highlighted_auction_1 != null" :auction="highlighted_auction_1"></auction-item>
  <auction-item v-if="highlighted_auction_2 != null" :auction="highlighted_auction_2"></auction-item>

  
  <!-- <img class="w-48" src="resources/logo_anim.svg" alt="loading" /> -->
  <!-- <span>Loading animation ^^</span> -->
</template>



<script type="module">
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import prohlizec from "../components/prohlizec.vue";
import AuctionItem from "../components/auction/AuctionItem.vue";  

export default {
  name: "Home",
  components: { prohlizec, AuctionItem},
  data() {
    return {

      id1: 5,
      id2: 6,
      
      highlighted_auction_1 : null,
      highlighted_auction_2 : null,
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

      const auction1 = await auction1_p;
      const auction2 = await auction2_p;

      if (!auction1.success || !auction2.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.highlighted_auction_1 = auction1.data;
      this.highlighted_auction_2 = auction2.data;
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
