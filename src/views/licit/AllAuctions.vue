<template>
  <!-- přehled aukcí pro uživatele typu licitátor, licitátor závoreň může tyto aukce spravovat -->
  <h1 class="text-2xl mb-2">Správa aukcí</h1>
  <p class="mb-1">Přehled všech aukcí a jejich stavu</p>
  <div class="inline-block mt-2 rounded bg-theyellow p-2 mb-1">
    id filtr
    <input type="text" v-model="id_filter" class="ml-1 w-16 h-6 rounded px-1" />
  </div>
  <generic-list
    :rows="filtered_auctions"
    :header="header"
    @checkChange="handleCheckChange"
    checkboxes
    auctionLinks
    class="max-h-97"
  ></generic-list>
  <h2 class="text-lg mb-1 mt-4">Akce</h2>
  <div class="p-2 bg-theyellow rounded h-80">
    <div class="flex h-full items-center justify-items-center gap-4">
      <div class="flex-1">
        <span> Zvolených aukcí: {{ checked_auctions.length }} </span>
        <ul>
          <li>
            <input type="radio" value="join_licit" v-model="picked_action" />
            <label>Připojit se jako licitátor</label>
          </li>
          <li>
            <input
              type="radio"
              value="reject_auction"
              v-model="picked_action"
            />
            <label>Zamítnout aukci</label>
          </li>
        </ul>
        <button
          @click="execAction"
          class="m-6 p-2 px-4 bg-theorange rounded text-xl"
        >
          Provést akci
        </button>
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
        ["Licitátor", "licitatorusername"],
        ["Autor", "autorusername"],
        ["Pravidlo", "pravidlo"],
        ["Typ", "typ"],
        ["Stav", "stav"],
        ["Cena", "cena"],
      ],
      auctions: [],

      id_filter: "",
    };
  },
  computed: {
    checked_auctions() {
      return this.auctions.filter((auction) => auction.checked);
    },

    filtered_auctions() {
      return this.auctions.filter((auction) =>
        auction.id.toString().includes(this.id_filter)
      );
    },
  },
  methods: {
    ...mapActions([
      "new_notif",
      "join_licit",
      "start_auction",
      "reject_auction",
    ]),

    async execAction() {
      let action;
      if (this.picked_action == "join_licit") {
        action = this.dispatch_join_auction;
      } else if (this.picked_action == "reject_auction") {
        action = this.dispatch_reject_auction;
      } else {
        return;
      }

      for (let auction of this.checked_auctions) {
        // action
        await action(auction);
      }

      // reload
      this.auctions = [];
      this.loaded_auctions = 0;
      this.get_auctions();
    },

    async dispatch_reject_auction(auction) {
      console.log(`Rejecting auction #${auction.cisloaukce}`);

      const response = await this.reject_auction({
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
        .get("/licit/auctions")
        .then((query_res) => {
          if (!query_res.data.success) {
            this.new_notif({
              text: query_res.data.message,
              urgency: "error",
            });
            this.auctions = [];
            return;
          }
          query_res.data.data.forEach((auction) => {
            auction.id = auction.cisloaukce;
            auction.checked = false;
          });
          this.auctions = this.auctions.concat(query_res.data.data);
          this.loaded_auctions += this.load_step;
        })
        .catch((err) => {
          this.new_notif({
            text: err.message,
            urgency: "error",
          });
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