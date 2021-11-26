<template>
  <div class="relative rounded bg-theyellow shadow-xl p-6 w-100">
    <div
      @click="$emit('closeSignal')"
      class="absolute right-0 w-8 h-8 bg-red-500"
    >
      x
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