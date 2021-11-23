<template>
  <div v-if="!auction">Aukce neexistuje</div>
  <div v-else>
    <h1 class="text-3xl mt-3 mb-8">{{ auction.nazev }}</h1>
    <div class="grid gap-3 mb-8 auction-grid">
      <div class="bg-theyellow rounded">
        <img
          :src="auction_main_picture"
          alt="Obrázek nemovitosti"
          class="max-h-64 rounded"
        />
      </div>
      <div class="bg-theyellow rounded p-6">
        <!-- probihajici -->
        <div v-if="auction.stav == 'probihajici'">
          <label class="text-md font-bold pl1">Aktuální cena</label>
          <div class="text-4xl pb-6">{{ auction.cena }} Kč</div>
          <label class="text-md font-bold pl1">Nová nabídka</label>
          <div class="mb-1 flex">
            <input
              placeholder="Vaše nabídka"
              type="text"
              v-model="bidField"
              class="inline input-field w-36"
            />
            <button @click="send_bid" class="ml-2 px-3 bg-theorange rounded">
              Potvrdit
            </button>
          </div>
          <div class="mb-4">
            Minimálně {{ auction.cena + auction.minprihoz }}
          </div>
          <label class="text-md font-bold pl1">Zbývá času</label>
          <div class="text-2xl">
            {{ time_left_to_end[0] }}:{{
              ("00" + time_left_to_end[1]).slice(-2)
            }}:{{ ("00" + time_left_to_end[2]).slice(-2) }}h
          </div>
        </div>
        <!-- ukoncena -->
        <div v-else-if="auction.stav == 'ukoncena'">
          <div class="text-lg pb-2">Aukce ukončena</div>
          <div class="text-lg pb-2">Prodejní cena:</div>
          <div class="text-4xl pb-6">{{ auction.cena }} Kč</div>
        </div>
        <!-- pred zacatkem -->
        <div v-else>
          <div class="text-lg pb-2">Cena začína na:</div>
          <div class="text-4xl pb-6">{{ auction.cena }} Kč</div>
          <button
            @click="send_join_request"
            class="p-2 bg-theorange rounded text-lg mt-4 disabled:opacity-50"
            :disabled="!can_join"
          >
            Připojit se
          </button>
        </div>
        <!-- todo other states -->
      </div>
      <article class="whitespace-pre-line bg-theyellow rounded p-6">
        <h2 class="text-lg ml-1 mb-1">Autor</h2>
        {{ auction.autorusername }}
        <h2 class="text-lg ml-1 mt-3 mb-1">Adresa</h2>
        {{ auction.adresa }}
        <h2 class="text-lg ml-1 mt-3 mb-1">Tagy</h2>
        {{ auction.tagy.join(", ") }}
        <h2 class="text-lg ml-1 mt-3 mb-1">Detaily</h2>

        {{ auction.popis }}
      </article>
      <div class="bg-theyellow rounded p-6">
        <h2 class="text-lg">Příhozy</h2>
        <generic-list :rows="bids" :header="header"></generic-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GenericList from "../components/GenericList.vue";

export default {
  components: { GenericList },
  props: [],
  data() {
    return {
      bids: [],
      header: [
        ["Uživatel", "username"],
        ["Částka", "castka"],
      ],

      id: this.$route.params.id,
      auction: null,
      object_detail: "text of detail",
      bidField: "",
      now: new Date(),

      can_join: false,
    };
  },
  computed: {
    auction_main_picture() {
      return process.env.VUE_APP_BACKEND_URL + "/" + this.auction.foto_url;
    },

    time_left_to_end() {
      let secs = Math.floor(this.time_left_end_ms / 1000);
      let mins = Math.floor(secs / 60);
      return [Math.floor(mins / 60), mins % 60, secs % 60];
    },

    auction_start() {
      return this.auction ? new Date(this.auction.zacatekaukce) : "none";
    },
    auction_end() {
      return this.auction ? new Date(this.auction.konecaukce) : "none";
    },
    time_left_end_ms() {
      return this.auction_end - this.now;
    },
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id;
    },
  },
  methods: {
    ...mapActions([
      "bid_auction",
      "get_bids",
      "get_auction",
      "new_notif",
      "join_auction_request",
      "user_can_join_auction",
    ]),

    async dispatch_can_join_auction() {
      if (this.$store.state.logged_in && this.id) {
        const resp = await this.user_can_join_auction({ auction_id: this.id });
        console.log(`Can join? auc ${this.id}`);
        console.log(resp.success);
        this.can_join = resp.success;
      } else {
        this.can_join = false;
      }
    },

    set_now() {
      this.now = new Date();
    },

    handleCheckChange() {
      console.log("todo CHECK CHANGED");
    },

    async load_auction() {
      let auction_promise = this.get_auction({ auction_id: this.id });
      let bids_promise = this.get_bids({ auction_id: this.id });

      const auction = await auction_promise;
      const bid = await bids_promise;

      if (!auction.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.auction = auction.data;
      this.bids = bid.data;
    },

    async dispatch_get_bids() {
      if (!this.auction) {
        console.log("Bids: auction not loaded yet");
        return;
      }

      const response = await this.get_bids(this.auction.cisloaukce);

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.bids = response.data;
    },

    async send_bid() {
      const bid = parseInt(this.bidField);

      this.bidField = "";

      if (isNaN(bid)) {
        this.new_notif({
          text: "Špatný input",
          urgency: "error",
        });
        return;
      }

      const payload = { auction_id: this.auction.cisloaukce, bid };

      const response = await this.bid_auction(payload);

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

    async send_join_request() {
      const response = await this.join_auction_request(this.auction.cisloaukce);

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
  mounted() {
    this.load_auction();
    this.dispatch_can_join_auction();
    this.set_now();
    window.setInterval(() => {
      this.set_now();
    }, 1000);
  },
};
</script>

<style>
.auction-grid {
  grid-template-columns: 5fr 3fr;
}
</style>