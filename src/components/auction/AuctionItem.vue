<template>
  <div class="h-56 min-h-full flex">
    <div class="h-56 w-56 flex-none rounded-l-xl border-2 border-theorange">
      <img
        class="rounded-l-xl"
        src="/resources/mock-auction-picture.jpg"
        alt=""
      />
    </div>
    <div
      class="
        w-full
        flex flex-col
        rounded-r-xl
        pl-4
        border-2 border-theorange border-l-0
        bg-theyellow
      "
    >
      <!-- Name -->
      <router-link
        :to="{ name: 'Auction', params: { id: auction.cisloaukce } }"
      >
        <div class="text-2xl pt-4 pb-3 hover:underline">
          {{ auction.nazev }}
        </div>
      </router-link>

      <!-- variable -->
      <div class="flex-grow">
        <div v-if="auction.stav == 'probihajici'">
          <div class="text-4xl pb-2 font-extrabold">
            {{ auction.cena + " Kč" }}
          </div>
          <div class="text-lg">
            <div>
              Zbývá {{ time_left_to_end[0] }}:{{
                ("00" + time_left_to_end[1]).slice(-2)
              }}h
            </div>
          </div>
        </div>
        <div v-else class="flex h-full">
          <div class="w-2/3">
            <div class="pb-1 text-xl">Počáteční částka:</div>
            <div class="text-2xl">
              {{ auction.cena + " Kč" }}
            </div>
          </div>
          <div class="w-1/3">
            <button
              @click="send_join_request"
              class="p-2 bg-theorange rounded text-lg mt-4 disabled:opacity-50"
              :disabled="!can_join"
            >
              Připojit se
            </button>
          </div>
        </div>
      </div>

      <!-- categories -->
      <div class="pt-3 flex flex-row gap-2">
        <div class="h-6">&nbsp;</div>
        <div class="w-10 px-3 bg-theorange rounded-full text-center min-w-max">
          {{ auction.pravidlo }}
        </div>
        <div class="w-10 px-3 bg-theorange rounded-full text-center min-w-max">
          {{ auction.typ }}
        </div>
      </div>

      <!-- tags -->
      <div class="py-3 flex flex-row gap-2">
        <div class="h-6">&nbsp;</div>
        <div
          v-for="tag in auction.tagy"
          :key="tag"
          class="w-10 h-6 px-3 bg-theorange rounded-full text-center min-w-max"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    auction: {
      nazev: String,
      stav: String,
      cena: Number,
      cisloaukce: Number,
      pravidlo: String,
      typ: String,
      tagy: {
        type: Array,
        validator: (prop) => prop.every((e) => typeof e === "string"),
      },
    },
  },
  data() {
    return {
      can_join: false,
    };
  },
  computed: {
    time_left_to_end() {
      let secs = Math.floor(this.time_left_end_ms / 1000);
      let mins = Math.floor(secs / 60);
      return [Math.floor(mins / 60), mins % 60, secs % 60];
    },
    auction_end() {
      if (this.auction && this.auction.stav == "probihajici") {
        return new Date(this.auction.konecaukce);
      }
      return null;
    },
    time_left_end_ms() {
      return this.auction_end - new Date();
    },
  },
  methods: {
    ...mapActions([
      "join_auction_request",
      "new_notif",
      "user_can_join_auction",
    ]),

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

    async dispatch_can_join_auction() {
      if (this.$store.state.logged_in && this.auction.cisloaukce) {
        const resp = await this.user_can_join_auction({
          auction_id: this.auction.cisloaukce,
        });
        console.log(`Can join? auc ${this.auction.cisloaukce}`);
        console.log(resp.success);
        this.can_join = resp.success;
      } else {
        this.can_join = false;
      }
    },
  },
  mounted() {
    // todo ask only if joinable
    this.dispatch_can_join_auction();
  },
};
</script>

<style>
</style>