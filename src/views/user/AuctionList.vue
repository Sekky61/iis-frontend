<template>
  <h1 class="text-2xl mb-2">Aukce</h1>

  <h2 class="text-lg mt-2">Probíhající aukce</h2>
  <generic-list :rows="active_auctions" :header="active_header"></generic-list>

  <h2 class="text-lg mt-2">Nepotvrzené aukce</h2>
  <generic-list
    :rows="unconfirmed_auctions"
    :header="unconfirmed_header"
  ></generic-list>

  <h2 class="text-lg mt-2">Potvrzené aukce</h2>
  <generic-list
    :rows="confirmed_auctions"
    :header="confirmed_header"
  ></generic-list>

  <h2 class="text-lg mt-2">Skončené aukce</h2>
  <generic-list :rows="ended_auctions" :header="ended_header"></generic-list>

  {{ auctions }}
</template>

<script>
import { mapActions } from "vuex";
import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      unconfirmed_header: [
        ["Název", "nazev"],
        ["Vyvolávací cena", "cena"],
      ],

      confirmed_header: [
        ["Název", "nazev"],
        ["Vyvolávací cena", "cena"],
        ["Licitátor", "licitator"],
        ["Přihlášených", "todo"],
        ["Minimální počet přihlášených", "todo"],
      ],

      active_header: [
        ["Název", "nazev"],
        ["Aktuální cena", "cena"],
        ["Licitátor", "licitator"],
        ["Přihlášených", "todo"],
        ["Konec", "konecaukce"],
      ],

      ended_header: [
        ["Název", "nazev"],
        ["Prodejní cena", "cena"],
        ["Licitátor", "licitator"],
        ["Výherce", "todo"],
      ],

      auctions: [],
    };
  },

  computed: {
    // todo can be done with single filter
    unconfirmed_auctions() {
      return this.auctions.filter((auction) => auction.stav == "neschvalena");
    },
    confirmed_auctions() {
      return this.auctions.filter((auction) => auction.stav == "schvalena");
    },
    active_auctions() {
      return this.auctions.filter((auction) => auction.stav == "probihajici");
    },
    ended_auctions() {
      return this.auctions.filter((auction) => auction.stav == "ukoncena");
    },
    rejected_auctions() {
      return this.auctions.filter((auction) => auction.stav == "zamitnuta");
    },
  },

  methods: {
    ...mapActions(["new_notif", "load_users_auctions"]),

    async load_my_auctions() {
      const response = await this.load_users_auctions();

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.auctions = response.data;
    },
  },
  mounted() {
    this.load_my_auctions();
  },
};
</script>

