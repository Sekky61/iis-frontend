<template>
  <h1 class="text-2xl mb-8">{{ auction ? auction.nazev : "none" }}</h1>
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
          v-model="bidField"
          class="w-32 rounded pl-1"
        />
        <button @click="send_bid" class="px-3 ml-1 bg-theorange rounded">
          Potvrdit
        </button>
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
      id: this.$route.params.id,
      auction: null,
      object_detail: "text of detail",
      auction_end: undefined,
      time_left: undefined,
      auction_main_picture: "/resources/mock-auction-picture.jpg",
      bidField: "",
    };
  },
  computed: {
    time_left_cp() {
      let secs = Math.floor(this.time_left / 1000);
      let mins = Math.floor(secs / 60);
      return [Math.floor(mins / 60), mins % 60, secs % 60];
    },
  },
  watch: {
    $route(to, from) {
      this.id = to.params.id;
    },
    id: {
      handler(to, from) {
        if (this.id) {
          this.$backend_api
            .get(`/auction/${this.id}`)
            .then((response) => {
              console.log("Response txt:");
              console.log(response);
              try {
                // response.data jsou data odpovědi
                let resp_obj = response.data;
                if (resp_obj.success) {
                  console.log("SUCCESS MSG"); // todo popup
                  this.auction = resp_obj.data;
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
        } else {
          this.auction = null;
        }
      },
      immediate: true,
    },
  },
  methods: {
    set_time_left() {
      this.time_left = this.auction_end - new Date();
    },

    send_bid() {
      this.$backend_api
        .post(`/auction/${this.id}/user/bid`, { bid: this.bidField })
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            // response.data jsou data odpovědi
            let resp_obj = response.data;
            if (resp_obj.success) {
              console.log("SUCCESS MSG"); // todo popup
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
            console.log("Bad code");
            console.log(error.response.message);
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