<template>
  <!-- detail jednotlivé aukce -->
  <div v-if="!auction">Aukce neexistuje</div>
  <div v-else>
    <h1 class="text-3xl mt-3 mb-8">{{ auction.nazev }}</h1>
    <div class="grid gap-3 mb-8 auction-grid">
      <div class="bg-theyellow rounded">
        <img
          :src="auction_main_picture"
          alt="Obrázek nemovitosti"
          class="max-h-80 rounded"
        />
      </div>
      <div class="bg-theyellow rounded p-6">
        <!-- probihajici -->
        <div v-if="auction.stav == 'neschvalena'" class="text-xl">
          Neschválená aukce
        </div>
        <div v-else-if="auction.stav == 'probihajici'">
          <div v-if="auction.pravidlo == 'otevrena'">
            <!-- otevrena - public price -->
            <label class="text-md font-bold pl1">Aktuální cena</label>
            <div class="text-4xl pb-6">{{ auction.cena }} Kč</div>
          </div>
          <div class="mb-4" v-if="is_participating">
            <label class="text-md font-bold pl1">Nová nabídka</label>
            <div v-if="auction.typ == 'nabidkova'">
              <div class="mb-1 flex">
                <input
                  placeholder="Vaše nabídka"
                  type="text"
                  v-model="bidField"
                  class="inline input-field w-36"
                />
                <button
                  @click="send_bid"
                  class="ml-2 px-3 bg-theorange rounded"
                >
                  Potvrdit
                </button>
                <div v-if="auction.pravidlo == 'otevrena'" class="mb-4">
                  Minimálně {{ auction.cena + auction.minprihoz }}
                </div>
              </div>
            </div>
            <div v-else>
              <!-- poptavkova - offer and object -->
              <button
                @click="show_pick_object_popup"
                class="ml-2 px-3 bg-theorange rounded"
              >
                Nabídnout objekt
              </button>
            </div>
          </div>
          <div class="mb-4" v-else>
            <!-- user is not part of auction -->
            <button
              @click="send_join_request"
              class="p-2 bg-theorange rounded text-lg mt-4 disabled:opacity-50"
              :disabled="!can_join"
            >
              Připojit se
            </button>
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
        <h2 class="text-lg ml-1 mt-3 mb-1">Detaily</h2>
        {{ auction.popis }}
        <h2 class="text-lg ml-1 mt-3 mb-1">Tagy</h2>

        <div class="py-3 flex flex-row flex-wrap gap-2">
          <div v-for="tag in auction.tagy" :key="tag" class="tag">
            {{ tag }}
          </div>
        </div>
      </article>
      <div class="bg-theyellow rounded p-6">
        <h2 class="text-lg">Příhozy</h2>
        <div v-if="auction.pravidlo == 'otevrena'">
          <generic-list
            :rows="sorted_bids"
            :header="bid_header"
            :objectPopups="auction.typ == 'poptavkova'"
            @showObjectPopup="show_detail_popup"
          ></generic-list>
          <!-- TODO popup fix -->
        </div>
        <div v-else>V uzavřené aukci jsou příhozy tajné</div>
      </div>
    </div>
    <div
      v-if="detail_popup_visible"
      class="z-50 fixed inset-0 bg-black bg-opacity-40"
    >
      <div class="flex h-full items-center justify-center">
        <object-detail
          @closeSignal="handleCloseSignalDetail"
          :object="detailed_object"
        ></object-detail>
      </div>
    </div>
    <div
      v-if="pick_popup_visible"
      class="z-50 fixed inset-0 bg-black bg-opacity-40"
    >
      <div class="flex h-full items-center justify-center">
        <pick-object
          :auction_id="this.id"
          @closeSignal="handleCloseSignalPick"
        ></pick-object>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GenericList from "../components/GenericList.vue";
import ObjectDetail from "../components/ObjectDetail.vue";
import PickObject from "../components/BidObject.vue";

export default {
  components: { GenericList, ObjectDetail, PickObject },
  props: [],
  data() {
    return {
      bids: [],

      detailed_object: {
        nazev: "abc",
        popis: "long evwrin cbhibvewfvbjewibviewfv",
        foto_url: "/resources/holt.png",
        adresa: "barbaz",
      },

      detail_popup_visible: false,
      pick_popup_visible: false,

      bid_header: [
        ["Uživatel", "username"],
        ["Částka", "castka"],
      ],

      id: this.$route.params.id,
      auction: null,
      object_detail: "text of detail",
      bidField: "",
      now: new Date(),

      can_join: false,
      is_participating: false,

      bid_polling_handle: null,
      ticker_handle: null,
    };
  },
  computed: {
    auction_main_picture() {
      if (this.auction.foto_url) {
        return process.env.VUE_APP_BACKEND_URL + "/" + this.auction.foto_url;
      } else {
        return this.$store.state.default_auction_picture_url;
      }
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

    // poptavkova => lowest bid first
    sorted_bids() {
      if (this.auction.typ == "poptavkova") {
        return [...this.bids].sort((first, second) => {
          return first.castka - second.castka;
        });
      } else {
        return [...this.bids].sort((first, second) => {
          return second.castka - first.castka;
        });
      }
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
      "user_is_participating",
    ]),

    show_detail_popup(row) {
      this.detailed_object = row;
      this.detail_popup_visible = true;
    },

    show_pick_object_popup() {
      this.pick_popup_visible = true;
    },

    handleCloseSignalDetail() {
      this.detail_popup_visible = false;
    },

    handleCloseSignalPick() {
      this.pick_popup_visible = false;
    },

    async dispatch_user_is_participating() {
      if (this.$store.state.logged_in && this.id) {
        const resp = await this.user_is_participating({ auction_id: this.id });
        this.is_participating = resp.data;
      } else {
        this.is_participating = false;
      }
    },

    async dispatch_can_join_auction() {
      if (this.$store.state.logged_in && this.id) {
        const resp = await this.user_can_join_auction({ auction_id: this.id });
        if (!resp.success) {
          this.can_join = false;
          this.new_notif({
            text: resp.message,
            urgency: "error",
          });
        }
        this.can_join = resp.data;
      } else {
        this.can_join = false;
      }
    },

    set_now() {
      this.now = new Date();
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

      if (this.auction.pravidlo == "uzavrena") {
        // stop polling bids
        clearInterval(this.bid_polling_handle);
      }
    },

    poll_bids() {
      this.bid_polling_handle = setInterval(() => {
        this.dispatch_get_bids();
        console.log("bids polled");
      }, 10000);
    },

    start_ticker() {
      this.ticker_handle = setInterval(() => {
        this.set_now();
      }, 1000);
    },

    async dispatch_get_bids() {
      if (!this.auction) {
        console.log("Bids: auction not loaded yet");
        return;
      }

      const response = await this.get_bids({
        auction_id: this.auction.cisloaukce,
      });

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
  async mounted() {
    await this.load_auction();

    this.set_now();
    this.start_ticker();
    await this.dispatch_user_is_participating();
    await this.dispatch_can_join_auction();
    this.poll_bids();
  },
  unmounted() {
    clearInterval(this.bid_polling_handle);
    clearInterval(this.ticker_handle);
  },
};
</script>

<style>
.auction-grid {
  grid-template-columns: 5fr 4fr;
}
</style>