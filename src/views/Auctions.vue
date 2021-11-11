<template>
  <h1 class="text-3xl p-4">Kategorie {{ category }} - {{ subcategory }}</h1>
  <button @click="load_auctions(0, 4)" class="bg-green-500">load moar</button>
  {{ filterObj }}
  <ul>
    <li
      v-for="item in filtered_auctions"
      :key="item.cisloaukce"
      class="px-4 py-3"
    >
      <auction-item :auction="item"></auction-item>
    </li>
  </ul>
   <ul>
    <li
      v-for="item in filtered_auctions"
      :key="item.cisloaukce"
      class="px-4 py-3"
    >
      <Auction_beforeStart :auction="item"></Auction_beforeStart>
    </li>
  </ul>
</template>

<script>
import AuctionItem from "../components/auction/AuctionItem.vue";
import Auction_beforeStart from "../components/auction/Auction_beforeStart.vue";

export default {
  components: { AuctionItem , Auction_beforeStart},
  props: ["category", "subcategory", "filterObj"],
  data() {
    return {
      auctions: [
        {
          nazev: "Zánovní škoda 105",
          cena: 750,
          cisloaukce: 555,
          tagy: ["a", "b", "c"],
          typ:  "nabidkova",
          stav: "schvalena",
          pristup: "otevrene",
        },
        {
          nazev: "Skripta do IZP",
          cena: 556,
          cisloaukce: 2,
          tagy: ["a", "b", "c", "r", "byt", "delsi tag problem"],
          typ:  "poptavkova",
          stav: "probihajici",
          pristup: "otevrene",
        },
        {
          nazev: "Ikea stolička, perfektní stav",
          cena: 12,
          cisloaukce: 38,
          typ:  "poptavkova",
          stav: "schvalena",
          pristup: "otevrene",
        },
          {
          nazev: "Dildo",
          cena: 325,
          cisloaukce: 17,
          typ:  "nabidkova",
          stav: "probihajici",
          pristup: "otevrene",
        },
          {
          nazev: "Manželka",
          cena: 0,
          cisloaukce: 420,
          typ:  "nabidkova",
          stav: "schvalena",
          pristup: "uzavrene",
        },
      ],
    };
  },
  computed: {
    filtered_auctions() {
      return this.auctions.filter((au) => this.passes(au, this.filterObj));
    },
  },
  methods: {
    passes(auction, filterObj) {

      //typ aukce
      if(filterObj.nabidkove && !filterObj.poptavkove){
        if(auction.typ == 'nabidkova'){
          return true;
        } else {
          return false;
        }
      } else if(filterObj.poptavkove && !filterObj.nabidkove){
        if(auction.typ == 'poptavkova'){
          return true;
        } else {
          return false;
        }
      }else if((filterObj.poptavkove) && (filterObj.nabidkove)){
        return true;
      }

      
    },

    load_auctions(offset, number) {
      this.$backend_api
        .get("/auctions", { params: { offset, number } })
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            // response.data jsou data odpovědi
            let resp_obj = response.data;
            if (resp_obj.success) {
              //this.auctions.concat(resp_obj.data);
              this.auctions = this.auctions.concat(resp_obj.data); // todo push unique keys only, maybe id map instead of array
              console.log("New auctions");
              console.log(this.auctions);
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
};
</script>

<style>
</style>