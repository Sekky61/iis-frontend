<template>
  <h1 class="text-3xl p-4">Kategorie {{ category }} - {{ subcategory }}</h1>
  <ul>
    <li v-for="item in items" :key="item" class="p-4">
      <auction-item :auction="item"></auction-item>
    </li>
  </ul>
</template>

<script>
import AuctionItem from "../components/auction/AuctionItem.vue";

export default {
  components: { AuctionItem },
  props: ["category", "subcategory"],
  data() {
    return {
      items: [
        {
          name: "Zánovní škoda 105",
          price: 750,
        },
        {
          name: "Skripta do IZP",
          price: 48,
        },
        {
          name: "Dvakrát přejetý, pomocí izolepy držící atlas světa",
          price: 1260,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>