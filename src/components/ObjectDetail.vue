<template>
  <div class="relative rounded bg-theyellow shadow-xl p-6 w-100">
    <div
      @click="$emit('closeSignal')"
      class="absolute right-0 w-8 h-8 bg-red-500"
    >
      x
    </div>
    <h1 class="text-xl">{{ object.nazev }}</h1>
    <img :src="object.foto_url" alt="Obrázek objektu" class="h-64 my-8" />
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
  methods: {
    close_popup() {},
  },
};
</script>

<style>
</style>