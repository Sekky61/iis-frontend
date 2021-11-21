<template>
  <h1 class="text-2xl mb-2">Správa mých aukcí</h1>
  <generic-list
    :rows="auctions"
    :header="header"
    @checkChange="handleCheckChange"
    checkboxes
  ></generic-list>
  <h2 class="text-lg my-1">Akce</h2>
  <div class="p-2 bg-theyellow rounded h-80">
    <div class="flex h-full items-center justify-items-center gap-4">
      <div class="flex-1">
        <span> Zvolených uživatelů: {{ checked_auctions.length }} </span>
        <ul>
          <li>
            <input type="radio" value="join_licit" v-model="picked_action" />
            <label>Připojit se jako licitátor</label>
          </li>
          <li>
            <input type="radio" value="start_auction" v-model="picked_action" />
            <label>Spustit aukci</label>
          </li>
        </ul>
        <button
          @click="execAction"
          class="m-6 p-2 px-4 bg-theorange rounded text-xl"
        >
          Provést akci
        </button>
      </div>

      <div class="flex-1">
        <div v-if="picked_action == 'join_licit'">x</div>
        <div v-else-if="picked_action == 'start_auction'">z</div>
        <div v-else>Error</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      picked_action: "join_licit",

      header: [
        ["ID", "id"],
        ["Název", "nazev"],
        ["Licitátor", "licitator"],
        ["Autor", "autor"],
        ["Objekt", "idobject"],
        ["Pravidlo", "pravidlo"],
        ["Typ", "typ"],
        ["Stav", "stav"],
        ["Cena", "cena"],
      ],
      auctions: [],

      loaded_auctions: 0,
      load_step: 5,
    };
  },
  computed: {
    checked_auctions() {
      return this.auctions.filter((auction) => auction.checked);
    },
  },
  methods: {
    ...mapActions(["new_notif", "join_licit", "start_auction"]),

    async execAction() {
      let action;
      if (this.picked_action == "join_licit") {
        action = this.dispatch_join_auction;
      } else if (this.picked_action == "start_auction") {
        action = this.dispatch_start_auction;
      } else {
        return;
      }

      for (let auction of this.checked_auctions) {
        // action
        await action(auction);
      }

      // reload
      this.auctions = [];
      this.get_auctions();
    },

    async dispatch_join_auction(auction) {
      console.log(`Joining auction #${auction.cisloaukce}`);

      const response = await this.join_licit({
        auction_id: auction.cisloaukce,
      });

      if (response.success) {
        this.new_notif({
          text: response.message,
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

    async dispatch_start_auction(auction) {
      console.log(`Starting auction #${auction.cisloaukce}`);

      const response = await this.start_auction({
        auction_id: auction.cisloaukce,
      });

      if (response.success) {
        this.new_notif({
          text: response.message,
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

    handleCheckChange(e) {
      let auction = this.auctions.find(
        (auction) => auction.id == e.target.value
      );
      console.log(auction);
      auction.checked = !auction.checked;
    },

    get_auctions() {
      this.$backend_api
        .get("/licit/auctions", {
          params: { offset: this.loaded_auctions, number: this.load_step },
        })
        .then((query_res) => {
          if (!query_res.data.success) {
            console.log("bad result");
            this.auctions = [];
            return;
          }
          console.log("res");
          console.log(query_res.data.data);
          query_res.data.data.forEach((auction) => {
            auction.id = auction.cisloaukce;
            auction.checked = false;
          });
          this.auctions = this.auctions.concat(query_res.data.data);
          this.loaded_auctions += this.load_step;
        })
        .catch((err) => {
          this.new_notif({
            // todo copy from another place
            text: err.message,
            urgency: "error",
          });
          console.log(`Get failed: ${err}`);
          return "error";
        });
    },
  },
  mounted() {
    this.get_auctions();
  },
};
</script>

<style>
</style>