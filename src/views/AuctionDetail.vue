<template>
  <h1 class="text-2xl mb-8">{{ name }}</h1>
  <div class="flex gap-4 mb-8">
    <div class="w-64 h-64 bg-theyellow rounded">
      <picture>
        <img :src="auction_main_picture" alt="Flowers" style="width: auto" />
      </picture>
    </div>
    <div class="bg-theyellow rounded flex-grow px-6 pt-8">
      <div class="text-4xl pb-6">456 Kč</div>
      <div class="mb-4">
        <input
          placeholder="Vaše nabídka"
          type="text"
          name=""
          id="prihoz_input"
          class="w-32 rounded pl-1"
        />
        <button class="px-3 ml-1 bg-theorange rounded">Potvrdit</button>
      </div>
      <div class="text-2xl">
        {{ ("00" + time_left_cp[0]).slice(-2) }}:{{
          ("00" + time_left_cp[1]).slice(-2)
        }}:{{ ("00" + time_left_cp[2]).slice(-2) }}
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
      auction_end: undefined,
      time_left: undefined,
      auction_main_picture: "/resources/mock-auction-picture.jpg",
    };
  },
  computed: {
    time_left_cp() {
      let secs = Math.floor(this.time_left / 1000);
      let mins = Math.floor(secs / 60);
      return [Math.floor(mins / 60), mins % 60, secs % 60];
    },
  },
  methods: {
    set_time_left() {
      this.time_left = this.auction_end - new Date();
    },
  },
  created: function () {
    this.id = this.$route.params.id;
    this.auction_end = new Date().getTime() + 2 * 60 * 1000;
    this.time_left = this.auction_end - new Date();
    // load details
  },
  mounted: function () {
    window.setInterval(() => {
      this.set_time_left();
    }, 1000);
  },
};
</script>

<style>
</style>