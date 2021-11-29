<template>
  <!-- posuvný teaser s fotkami pro domovskou sránku  -->
  <div class="transform hover:-translate-y-3 duration-500">
    <div
      class="
        flex
        bg-theyellow
        rounded-xl
        border-8
        overflow-hidden
        border-yellow-300
      "
    >
      <!-- obrázky pro teaser -->
      <img
        class="w-56 object-contain bg-white"
        :src="auction_main_picture"
        alt=""
      />
      <div class="w-full flex flex-col pl-4 border-l-3 h-64">
        <!-- Name -->
        <router-link
          :to="{ name: 'Auction', params: { id: auction.cisloaukce } }"
        >
          <div
            class="
              text-red-700 text-3xl
              font-extrabold
              pt-6
              align-bottom
              text-left
            "
          >
          <!-- Akční aukce pro domovskou stránku -->
            Končí za {{ time_left_to_end[0] }}:{{
              ("00" + time_left_to_end[1]).slice(-2)
            }}h!
          </div>
          <div class="text-2xl pt-4 pb-3 hover:underline">
            {{ auction.nazev }}
          </div>
        </router-link>

        <!-- variable -->
        <div class="flex-grow">
          <div class="flex">
            <div class="w-2/3">
              <div class="text-3xl font-extrabold">
                {{ auction.cena + " Kč" }}
              </div>
            </div>
          </div>
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
      foto_url: String,
      can_join: Boolean,
      tagy: {
        type: Array,
        validator: (prop) => prop.every((e) => typeof e === "string"),
      },
    },
  },
  data() {
    return {};
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
    auction_end() {
      if (this.auction && this.auction.stav == "probihajici") {
        return new Date(this.auction.konecaukce);
      }
      return null;
    },
    time_left_end_ms() {
      return this.auction_end - new Date();
    },
    status() {
      if (this.auction.stav == "probihajici") {
        return "Probíhající";
      } else if (this.auction.stav == "schvalena") {
        return "Před začátkem";
      } else {
        return "Ukončená";
      }
    },
    status_border_color() {
      if (this.auction.stav == "probihajici") {
        return "border-green-500";
      } else if (this.auction.stav == "schvalena") {
        return "border-theorange";
      } else {
        return "border-black";
      }
    },
    status_bg_color() {
      if (this.auction.stav == "probihajici") {
        return "bg-green-500";
      } else if (this.auction.stav == "schvalena") {
        return "bg-theorange";
      } else if (this.auction.stav == "akcni") {
        return "border-yellow-400";
      } else {
        return "bg-black";
      }
    },
  },
  methods: {
    ...mapActions(["join_auction_request", "new_notif"]),

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
};
</script>

<style>
</style>