<template>
  <div class="h-56 min-h-full flex">
    <div
      class="
        h-56
        w-56
        flex-none
        rounded-l-xl
        border-4 border-theorange
      "
    >
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
        border-4 border-theorange border-l-0
        bg-theyellow
      "
    >
      <router-link
        :to="{ name: 'Auction', params: { id: auction.cisloaukce } }"
      >
        <div class="text-2xl py-4 hover:underline">{{ auction.nazev }} </div>
      </router-link>
      <div class="pb-4 text-xl">Počáteční částka:</div>
      <div class="text-4xl pb-4 font-extrabold">
        {{ auction.cena + " Kč" }}
      </div>

      
      <div class="py-3 flex flex-row gap-2">
        <div
          v-for="tag in auction.tagy"
          :key="tag"
          class="w-12 px-2 bg-theorange rounded-full text-center min-w-max"
        >
          {{ tag }}
          
        </div>
      </div>
        
    </div>
  </div>
  <auction-join></auction-join>
</template>

<script>
import AuctionJoin from "./AuctionJoin.vue";
export default {
components: { AuctionJoin},
  props: {
    auction: {
      nazer: String,
      cena: Number,
      cisloaukce: Number,
      tagy: {
        type: Array,
        validator: (prop) => prop.every((e) => typeof e === "string"),
      },
    },
  },
};
</script>

<style>
</style>