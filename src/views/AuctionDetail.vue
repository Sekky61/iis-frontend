<template>
  <h1 class="text-2xl mb-8">{{ name }}</h1>
  <div class="flex gap-4 mb-8">
    <div class="w-64 h-64 bg-red-secondary rounded">
      <picture>
        <img :src="auction_main_picture" alt="Flowers" style="width: auto" />
      </picture>
    </div>
    <div class="bg-red-secondary rounded flex-grow px-6 pt-8">
      <div class="text-4xl pb-6">456 Kč</div>
      <div class="mb-4">
        <input
          placeholder="Vaše nabídka"
          type="number"
          name=""
          id="prihoz_input"
          class="w-32"
        />
        <button class="px-3 ml-1 bg-red-primary rounded">Potvrdit</button>
      </div>
      <div class="text-2xl">
        {{ seconds_left }}
      </div>
    </div>
  </div>
  <article class="whitespace-pre-line">
    {{ object_detail }}
  </article>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      deez: false,
      id: undefined,
      name: "Nazev aukce",
      object_detail: "Delší popis nemovitosti, její dispozice a lokace.",
      seconds_left: 30,
      auction_main_picture: "/resources/mock-auction-picture.jpg",
    };
  },
  watch: {
    seconds_left: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.seconds_left--;
          }, 1000);
        } else {
          this.seconds_left = "KONEC";
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {},
  created: function () {
    this.id = this.$route.params.id;
    // load details
  },
};
</script>

<style>
</style>