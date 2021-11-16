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
          <div class="text-l">
            <div>Zbývá 1:48h</div>
            <div>4 příhozy za poslední hodinu</div>
          </div>
        </div>
        <div v-else class="flex h-full">
          <div class="w-2/3">
            <div class="pb-4 text-xl">
              Počáteční částka:
              <span class="text-2xl">
                {{ auction.cena + " Kč" }}
              </span>
            </div>
            <div class="text-xl">
              Začíná za:
              <span class="text-2xl"> 00:00:00 </span>
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

      <!-- tags -->
      <div class="py-3 flex flex-row gap-2">
        <div
          v-for="tag in auction.tagy"
          :key="tag"
          class="w-10 px-3 bg-theorange rounded-full text-center min-w-max"
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
      tagy: {
        type: Array,
        validator: (prop) => prop.every((e) => typeof e === "string"),
      },
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