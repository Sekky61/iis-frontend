<template>
  <div class="relative rounded bg-theyellow shadow-xl p-6 w-100">
    <div
      @click="$emit('closeSignal')"
      class="absolute right-3 w-8 h-8 bg-red-500 rounded-full"
    >
      <div class="flex items-center justify-center w-8 h-8">
        <svg
          height="12"
          width="12"
          viewPort="0 0 2 2"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2" />
          <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2" />
        </svg>
      </div>
    </div>
    <h1 class="text-xl">{{ object.objekt_nazev }}</h1>
    <img :src="image_url" alt="Obrázek objektu" class="h-64 my-8" />
    <h2 class="text-lg mb-2">Adresa</h2>
    <p class="mb-6">{{ object.adresa }}</p>
    <h2 class="text-lg mb-2">Popis</h2>
    <p class="mb-6">{{ object.popis }}</p>
  </div>
</template>

<script>
export default {
  emits: ["closeSignal"],
  props: ["object"],
  computed: {
    image_url() {
      if (this.object.foto_url) {
        return object.foto_url;
      } else {
        return this.$store.state.default_auction_picture_url;
      }
    },
  },
};
</script>

<style>
</style>