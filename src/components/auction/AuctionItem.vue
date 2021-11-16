<template>
  <div class="h-56 min-h-full flex">
    <div class="h-56 w-56 flex-none rounded-l-xl border-2 border-theorange">
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
        border-2 border-theorange border-l-0
        bg-theyellow
      "
    >
      <!-- Name -->
      <router-link
        :to="{ name: 'Auction', params: { id: auction.cisloaukce } }"
      >
        <div class="text-2xl py-4 hover:underline">{{ auction.nazev }}</div>
      </router-link>

      <!-- variable -->
      <div class="flex-grow">
        <div v-if="auction.stav == 'probihajici'">
          <div class="text-4xl pb-4 font-extrabold">
            {{ auction.cena + " Kč" }}
          </div>
          <div class="text-lg">
            <div>
              Zbývá {{ time_left_to_end[0] }}:{{
                ("00" + time_left_to_end[1]).slice(-2)
              }}h
            </div>
          </div>
        </div>
        <div v-else class="flex h-full">
          <div class="w-2/3">
            <div class="pb-1 text-xl">Počáteční částka:</div>
            <div class="text-2xl">
              {{ auction.cena + " Kč" }}
            </div>
          </div>
          <div class="w-1/3">
            <button
              @click="send_join_request"
              class="p-2 bg-theorange rounded text-lg mt-4"
            >
              Připojit se
            </button>
          </div>
        </div>
      </div>

      <!-- categories -->
      <div class="pt-3 flex flex-row gap-2">
        <div class="h-6">&nbsp;</div>
        <div class="w-10 px-3 bg-theorange rounded-full text-center min-w-max">
          {{ auction.pravidlo }}
        </div>
        <div class="w-10 px-3 bg-theorange rounded-full text-center min-w-max">
          {{ auction.typ }}
        </div>
      </div>

      <!-- tags -->
      <div class="py-3 flex flex-row gap-2">
        <div class="h-6">&nbsp;</div>
        <div
          v-for="tag in auction.tagy"
          :key="tag"
          class="w-10 h-6 px-3 bg-theorange rounded-full text-center min-w-max"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auction: {
      nazev: String,
      stav: String,
      cena: Number,
      cisloaukce: Number,
      pravidlo: String,
      typ: String,
      tagy: {
        type: Array,
        validator: (prop) => prop.every((e) => typeof e === "string"),
      },
    },
  },
  computed: {
    time_left_to_end() {
      let secs = Math.floor(this.time_left_end_ms / 1000);
      let mins = Math.floor(secs / 60);
      return [Math.floor(mins / 60), mins % 60, secs % 60];
    },
    auction_end() {
      if (this.auction && this.auction.stav == "probihajici") {
        return new Date(this.auction.konecaukce);
      }
      return null;
    },
    time_left_end_ms() {
      return this.auction_end - new Date();
    },
  },
  methods: {
    send_join_request() {
      // if (!this.$store.state.logged_in) {
      //   this.$router.push({ name: "Register" }); // todo redirect back
      //   return;
      // }

      this.$backend_api
        .post(`/auction/${this.auction.cisloaukce}/user/join`)
        .then((response) => {
          let resp_obj = response.data;
          if (resp_obj.success) {
            console.log("SUCCESS MSG"); // todo popup
            return;
          } else {
            console.log("Bad attempt");
            this.$store.dispatch("new_notif", {
              text: "Nelze se připojit",
              urgency: "error",
            });
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

      this.$store.dispatch("new_notif", {
        text: "Nelze se připojit",
        urgency: "error",
      });
    },
  },
};
</script>

<style>
</style>