<template>
  <h1 class="text-xl text-center">Seznam mých aukcí</h1>
  <h2 class="text-lg">Probíhající aukce</h2>
  <button @click="load_auctions">load</button>
  <div>
    <generic-list :header="auction_header" :rows="auction_data"></generic-list>
  </div>
  <h2 class="text-lg">Skončené aukce</h2>
  <div>
    <generic-list :header="auction_header" :rows="auction_data"></generic-list>
  </div>
</template>

<script>
import GenericList from "../../components/GenericList.vue";

export default {
  components: { GenericList },
  data() {
    return {
      auction_header: ["Název", "Přihlášených"],
      auction_data: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    };
  },

  computed: {},

  methods: {
    load_auctions() {
      this.$backend_api
        .get("/user/auctions")
        .then((response) => {
          console.log("Response txt:");
          console.log(response);
          try {
            // response.data jsou data odpovědi
            let resp_obj = response.data;
            if (resp_obj.success) {
              this.auction_data = resp_obj.data;
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
    },
  },
};
</script>

