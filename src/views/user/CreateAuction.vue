<template>
  <h1 class="text-2xl m-2">Vytvořit novou aukci</h1>

  <form id="new_auction_form" @submit.prevent="processForm" class="m-8">
    <label class="text-sm font-bold pl-1">Název aukce</label>
    <input
      v-model="auction_name"
      class="input-field"
      type="text"
      placeholder="Zahrada 300m2"
      @blur.capture="validate_auction_name"
      :class="{ 'input-incorrect': !auction_name_valid }"
    />
    <label class="text-sm font-bold pl-1">Počáteční cena</label>
    <input
      v-model="starting_price"
      class="input-field"
      type="text"
      placeholder="150000"
      @blur.capture="validate_starting_price"
      :class="{ 'input-incorrect': !starting_price_valid }"
    />

    <label class="text-sm font-bold pl-1">Minimální výše příhozu</label>
    <input
      v-model="min_bid"
      class="input-field"
      type="text"
      placeholder="5000"
      @blur.capture="validate_min_bid"
      :class="{ 'input-incorrect': !min_bid_valid }"
    />

    <label class="text-sm font-bold pl-1">Pravidlo aukce</label>
    <select
      @blur.capture="validate_rule"
      :class="{ 'input-incorrect': !rule_valid }"
      v-model="rule"
      class="input-field"
    >
      <option value="uzavrena">Uzavřená</option>
      <option value="otevrena">Otevřená</option>
    </select>

    <label class="text-sm font-bold pl-1">Typ aukce</label>
    <select
      @blur.capture="validate_type"
      :class="{ 'input-incorrect': !type_valid }"
      v-model="type"
      class="input-field"
    >
      <option value="nabidkova">Nabídková</option>
      <option value="poptavkova">Poptávková</option>
    </select>

    <label class="text-sm font-bold pl-1">Minimální počet účastníků</label>
    <input
      v-model="min_participants"
      class="input-field"
      type="text"
      placeholder="1"
      @blur.capture="validate_min_participants"
      :class="{ 'input-incorrect': !min_participants_valid }"
    />

    <label class="text-sm font-bold pl-1">Číslo objektu</label>
    <input
      v-model="object"
      class="input-field"
      type="text"
      placeholder="např. 11"
      @blur.capture="validate_object"
      :class="{ 'input-incorrect': !object_valid }"
    />

    <div class="flex items-center justify-center my-4">
      <submit-button>Založit aukci</submit-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import InputField from "../../components/InputField.vue";
import SubmitButton from "../../components/SubmitButton.vue";

export default {
  components: { InputField, SubmitButton },
  data() {
    return {
      // auction_name, starting_price, min_bid, rule, type, min_participants, object

      auction_name: "",
      starting_price: "",
      min_bid: "",
      rule: "",
      type: "",
      min_participants: "",
      object: "",

      auction_name_valid: true,
      starting_price_valid: true,
      min_bid_valid: true,
      rule_valid: true,
      type_valid: true,
      min_participants_valid: true,
      object_valid: true,
    };
  },

  computed: {},

  methods: {
    ...mapActions(["create_auction", "new_notif"]),

    validate_auction_name() {
      this.auction_name_valid = true;
    },
    validate_starting_price() {
      this.starting_price_valid = true;
    },
    validate_min_bid() {
      this.min_bid_valid = true;
    },
    validate_rule() {
      this.rule_valid = true;
    },
    validate_type() {
      this.type_valid = true;
    },
    validate_min_participants() {
      this.min_participants_valid = true;
    },
    validate_object() {
      this.object_valid = true;
    },

    form_valid() {
      this.validate_auction_name();
      this.validate_starting_price();
      this.validate_min_bid();
      this.validate_rule();
      this.validate_type();
      this.validate_min_participants();
      this.validate_object();

      return (
        this.auction_name_valid &&
        this.starting_price_valid &&
        this.min_bid_valid &&
        this.rule_valid &&
        this.type_valid &&
        this.min_participants_valid &&
        this.object_valid
      );
    },

    async processForm() {
      const valid = this.form_valid();
      if (!valid) {
        this.new_notif({
          text: "Špatné vstupy", // todo exact messages
          urgency: "error",
        });
        return;
      }

      let form_data = {
        nazev: this.auction_name,
        vyvolavaci_cena: this.starting_price,
        min_prihoz: this.min_bid,
        pravidlo: this.rule,
        typ: this.type,
        min_ucastniku: this.min_participants,
        object: this.object,
      };

      const response = await this.create_auction(form_data);

      if (response.success) {
        this.new_notif({
          text: response.message,
          urgency: "success",
        });
      } else {
        // error popup
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>