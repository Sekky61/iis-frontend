<template>

  <!-- vytvoření různých vzledů aukcí podle stavu (ukončená, probíhající, schválená), 
  aukce jsou barevně odlišené a mají jiné vlastnosti -->
  <div>
    <div class="w-40 px-3 rounded-t ml-6" :class="status_bg_color">
      <span class="text-white">{{ status }}</span>
    </div>
    <div
      class="flex bg-theyellow rounded-xl border-3 overflow-hidden"
      :class="status_border_color"
    >
      <div class="w-72 bg-white flex items-center justify-center">
        <img
          class="object-contain max-w-full"
          :src="auction_main_picture"
          alt="Náhled aukce"
        />
      </div>
      <div
        class="w-full flex flex-col pl-4 border-l-3"
        :class="status_border_color"
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
          <!-- probihajici / live -->
          <div v-if="auction.stav == 'probihajici'">
            <div class="flex">
              <div class="w-2/3">
                <div class="text-4xl font-extrabold">
                  {{ auction.cena + " Kč" }}
                </div>
                <div>
                  Zbývá {{ time_left_to_end[0] }}:{{
                    ("00" + time_left_to_end[1]).slice(-2)
                  }}h
                </div>
              </div>
              <div class="w-1/3">
                <button
                  @click="send_join_request"
                  class="
                    p-2
                    bg-theorange
                    rounded
                    text-lg
                    mt-4
                    disabled:opacity-50
                  "
                  :disabled="!auction.can_join"
                >
                  Připojit se
                </button>
              </div>
            </div>
          </div>
          <div v-else-if="auction.stav == 'ukoncena'" class="">
            <div class="pb-1 text-xl">Prodejní cena:</div>
            <div class="text-2xl">
              {{ auction.cena + " Kč" }}
            </div>
          </div>
          <!-- pred zacatkem / before start -->
          <div v-else class="flex">
            <div class="w-2/3">
              <div class="pb-1 text-xl">Počáteční částka:</div>
              <div class="text-2xl">
                {{ auction.cena + " Kč" }}
              </div>
            </div>
            <div class="w-1/3">
              <button
                @click="send_join_request"
                class="
                  p-2
                  bg-theorange
                  rounded
                  text-lg
                  mt-4
                  disabled:opacity-50
                "
                :disabled="!auction.can_join"
              >
                Připojit se
              </button>
            </div>
          </div>
        </div>

        <!-- categories -->
        <div class="flex flex-row content-center pt-3 gap-2">
          <div class="tag">
            {{ auction.pravidlo }}
          </div>
          <div class="tag">
            {{ auction.typ }}
          </div>
        </div>

        <!-- tags -->
        <div class="py-3 flex flex-row flex-wrap gap-2">
          <div v-for="tag in auction.tagy" :key="tag" class="tag">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

// vlastnosti aukce
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
    //náhledový obrázek buňky aukce
    auction_main_picture() {
      if (this.auction.foto_url) {
        return process.env.VUE_APP_BACKEND_URL + "/" + this.auction.foto_url;
      } else {
        return this.$store.state.default_auction_picture_url;
      }
    },
    //zpracování času, pro vyhodnocení konce aukce
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
    //čas do konce aukce
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
    //barevné odlišení uakcí podle stavu aukce
    status_border_color() {
      if (this.auction.stav == "probihajici") {
        return "border-green-500";
      } else if (this.auction.stav == "schvalena") {
        return "border-theorange";
      } else {
        return "border-black";
      }
    },
    //štítek aukce podle stavu
    status_bg_color() {
      if (this.auction.stav == "probihajici") {
        return "bg-green-500";
      } else if (this.auction.stav == "schvalena") {
        return "bg-theorange";
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