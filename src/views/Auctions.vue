<template>
  <h1 class="text-3xl p-4">Kategorie {{ category }} - {{ subcategory }}</h1>
  <ul>
    <li
      v-for="item in filtered_auctions"
      :key="item.cisloaukce"
      class="px-4 py-3"
    >
      <auction-item :auction="item"></auction-item>
    </li>
  </ul>
  <div class="flex justify-center">
    <button @click="load_auctions" class="bg-theyellow p-2 rounded my-2">
      Načíst více
    </button>
  </div>
</template>

<script>
import AuctionItem from "../components/auction/AuctionItem.vue";

export default {
  components: { AuctionItem },
  props: ["category", "subcategory", "filterObj"],
  data() {
    return {
      auctions: [],

      auctions_loaded: 0,
      loaded_step: 2,
    };
  },
  computed: {
    filtered_auctions() {
      return this.auctions.filter((au) => this.passes(au, this.filterObj));
    },
  },
  methods: {
    passes(auction, filterObj) {
      if (
        (!filterObj.schvalene && auction.stav == "schvalena") ||
        (!filterObj.probihajici && auction.stav == "probihajici") ||
        (!filterObj.ukoncene && auction.stav == "ukoncena") ||
        (!filterObj.uzavrene && auction.pravidlo == "uzavrena") ||
        (!filterObj.otevrene && auction.pravidlo == "otevrena") ||
        (!filterObj.nabidkove && auction.typ == "nabidkova") ||
        (!filterObj.poptavkove && auction.typ == "poptavkova")
      ) {
        return false;
      }

      if (filterObj.tagy.length > 0) {
        if (!auction.tagy) {
          return false;
        }
        let includes_all_tags = filterObj.tagy.every((tag) =>
          auction.tagy.includes(tag)
        );

        if (!includes_all_tags) {
          return false;
        }
      }

      if (filterObj.query != "") {
        let lowercase_query = filterObj.query.toLowerCase();
        let lowercase_name = auction.nazev.toLowerCase();
        if (!lowercase_name.includes(lowercase_query)) {
          return false;
        }
      }

      return true;
    },

    load_auctions() {
      this.$backend_api
        .get("/auctions", {
          params: { offset: this.auctions_loaded, number: this.loaded_step },
        })
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            // response.data jsou data odpovědi
            let resp_obj = response.data;
            if (resp_obj.success) {
              //this.auctions.concat(resp_obj.data);
              this.auctions = this.auctions.concat(resp_obj.data); // todo push unique keys only, maybe id map instead of array
              this.auctions_loaded += this.loaded_step;
            } else {
              console.log("Bad attempt");
              return; // todo show message
            }
          } catch (e) {
            console.log("Response parse error:");
            console.log(e);
          }
        })
        .catch((error) => {
          this.error_message = error;
          if (error.response) {
            // response outside of 2xx
            console.log("Bad login");
          } else if (error.request) {
            // no response
            console.log("No response");
          } else {
            // other error
            console.log("Error", error.message);
          }
        });
    },
  },
  mounted() {
    this.load_auctions();
  },
};
</script>

<style>
</style>