<template>
  <!-- správa aukcí pro uživatele licitátor, licitátor zde může aukci spustit, vyhodnotit... -->
  <h1 class="text-2xl mb-2">Správa mých aukcí</h1>
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
        <h3 class="text-lg my-1">Akce</h3>
        <span> Zvolených aukcí: {{ checked_auctions_length }} </span>
        <ul>
          <li>
            <input
              type="radio"
              value="see_participants"
              v-model="picked_action"
            />
            <label>Účastníci</label>
          </li>
          <li>
            <input type="radio" value="start_auction" v-model="picked_action" />
            <label>Spustit aukci</label>
          </li>
          <li>
            <input
              type="radio"
              value="evaluate_auction"
              v-model="picked_action"
            />
            <label>Vyhodnotit aukci</label>
            <!-- todo vyhodnotit -->
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
        <div v-if="picked_action == 'see_participants'">
          <h3 class="text-lg my-1">Účastníci aukce</h3>
          <generic-list
            v-if="checked_auctions_length == 1"
            :rows="participants"
            :header="participants_header"
          ></generic-list>
          <div v-else>Musí být vybrána jedna aukce</div>
        </div>
        <div v-else-if="picked_action == 'evaluate_auction'">
          <div
            v-if="
              checked_auctions_length == 1 &&
              checked_auctions[0].stav == 'ukoncena'
            "
          >
            Vyhodnocení

            <generic-list
              :rows="participants"
              :header="participants_header"
              checkboxes
              @checkChange="evaluate_check_change"
            ></generic-list>
            <div v-if="checked_participants_length == 1">
              <button
                class="p-2 rounded bg-theorange"
                @click="dispatch_evaluate_auction"
              >
                Potvrdit výherce
              </button>
            </div>
            <div v-else>Musí být vybrán jeden výherce</div>
          </div>
          <div v-else>Musí být vybrána jedna ukončená aukce</div>
        </div>
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
      picked_action: "see_participants",

      id_filter: "",

      winner_id: 0,

      participants_header: [
        ["Uživatel", "username"],
        ["Schválen", "schvalentext"],
      ],

      participants: [],

      header: [
        ["ID", "id"],
        ["Název", "nazev"],
        ["Autor", "autorusername"],
        ["Schválených účastníků", "pocetschvalenychucastniku"],
        ["Minimální počet účastníků", "minpocetucastniku"],
        ["Pravidlo", "pravidlo"],
        ["Typ", "typ"],
        ["Stav", "stav"],
      ],

      auctions: [],
    };
  },
  computed: {
    checked_auctions() {
      return this.auctions.filter((auction) => auction.checked);
    },

    checked_participants() {
      return this.participants.filter((user) => user.checked);
    },

    checked_participants_length() {
      return this.checked_participants.length;
    },

    checked_auctions_length() {
      return this.checked_auctions.length;
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
      "start_auction",
      "list_participants",
      "evaluate_auction",
    ]),

    async execAction() {
      console.log(`exec ${this.picked_action}`);
      let action;
      if (this.picked_action == "start_auction") {
        action = this.dispatch_start_auction;
      } else if (this.picked_action == "evaluate_auction") {
        action = this.dispatch_evaluate_auction;
      } else {
        return;
      }

      for (let auction of this.checked_auctions) {
        // action
        console.log(`exec lup`);
        await action(auction);
      }

      // reload
      this.get_auctions();
    },

    evaluate_check_change(e) {
      let user = this.participants.find((user) => user.id == e.target.value);
      console.log(user);
      user.checked = !user.checked;
    },

    async dispatch_evaluate_auction() {
      let auction = this.checked_auctions[0];
      let winner = this.checked_participants[0];

      console.log(
        `Evaluating auction #${auction.cisloaukce} -- winner #${winner.id} ${winner.username}`
      );

      const response = await this.evaluate_auction({
        auction_id: auction.cisloaukce,
        winner_id: winner.id,
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

    async get_participants(id) {
      console.log(`Listing participants #${id}`);

      const response = await this.list_participants({
        auction_id: id,
      });

      console.log("getting and returning ");
      console.log(response.data);

      if (response.success) {
        return response.data;
      } else {
        return [];
      }
    },

    async handleCheckChange(e) {
      let auction = this.auctions.find(
        (auction) => auction.id == e.target.value
      );
      console.log(auction);
      auction.checked = !auction.checked;

      if (this.checked_auctions_length == 1) {
        this.participants = await this.get_participants(
          this.checked_auctions[0].id
        );
        this.participants.forEach(
          (el) => (el.schvalentext = el.schvalen ? "Ano" : "Ne")
        );
      } else {
        this.participants = [];
      }
    },

    get_auctions() {
      this.$backend_api
        .get("/licit/my-auctions")
        .then((query_res) => {
          if (!query_res.data.success) {
            this.auctions = [];
            return;
          }
          query_res.data.data.forEach((auction) => {
            auction.id = auction.cisloaukce;
            auction.checked = false;
          });
          this.auctions = query_res.data.data;
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