<template>
  <h1>Vytvořit novou aukci</h1>

  <form
    id="new_auction_form"
    @submit.prevent="processForm"
    @keyup.enter="processForm"
    class="m-8"
  >
    <input-field
      class="w-full"
      v-bind="auction_name_field"
      @fieldchange="change_field(auction_name_field, $event)"
    >
    </input-field>

    <input-field
      class="w-full"
      v-bind="starting_price_field"
      @fieldchange="change_field(starting_price_field, $event)"
    >
    </input-field>

    <input-field
      class="w-full"
      v-bind="min_bid_field"
      @fieldchange="change_field(min_bid_field, $event)"
    >
    </input-field>

    <label class="text-grey-darker text-sm font-bold pl-1">{{
      rule_field.label
    }}</label>
    <select
      v-model="rule_field.value"
      class="
        focus:outline-none
        appearance-none
        rounded
        w-full
        mt-1
        py-2
        px-3
        text-grey-darker
        bg-white
        border
      "
    >
      <option value="uzavrena">Uzavřená</option>
      <option value="otevrena">Otevřená</option>
    </select>

    <label class="text-grey-darker text-sm font-bold pl-1">{{
      type_field.label
    }}</label>
    <select
      v-model="type_field.value"
      class="
        focus:outline-none
        appearance-none
        rounded
        w-full
        mt-1
        py-2
        px-3
        text-grey-darker
        bg-white
        border
      "
    >
      <option value="nabidkova">Nabídková</option>
      <option value="poptavkova">Poptávková</option>
    </select>

    <input-field
      class="w-full"
      v-bind="min_participants_field"
      @fieldchange="change_field(min_participants_field, $event)"
    >
    </input-field>

    <input-field
      class="w-full"
      v-bind="object_field"
      @fieldchange="change_field(object_field, $event)"
    >
    </input-field>

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
      auction_name_field: {
        label: "Název aukce",
        placeholder: "Prodej bytu 3+kk 86m2",
        value: "",
        type: "text",
      },

      starting_price_field: {
        label: "Startovací cena",
        placeholder: "1010000",
        value: "",
        type: "text",
      },

      min_bid_field: {
        label: "Minimální příhoz",
        placeholder: "5000",
        value: "",
        type: "text",
      },

      rule_field: {
        label: "Pravidlo aukce",
        placeholder: "",
        value: "",
        type: "text",
      },

      type_field: {
        label: "Typ aukce",
        placeholder: "",
        value: "",
        type: "text",
      },

      min_participants_field: {
        label: "Minimální počet účastníků",
        placeholder: "např. 3",
        value: "",
        type: "text",
      },

      object_field: {
        label: "Číslo objektu",
        placeholder: "např. 2",
        value: "",
        type: "text",
      },
    };
  },

  computed: {
    pravidlo_converted() {
      if (this.rule_field.value == "Uzavřená") {
        return "uzavrena";
      } else if (this.rule_field.value == "Otevřená") {
        return "otevrena";
      }
      return "undef";
    },

    typ_converted() {
      if (this.rule_field.value == "Nabídková") {
        return "uzavrena";
      } else if (this.rule_field.value == "Poptávková") {
        return "poptavkova";
      }
      return "undef";
    },
  },

  methods: {
    ...mapActions(["create_auction", "new_notif"]),

    change_field(obj, new_val) {
      obj.value = new_val;
    },

    async processForm() {
      let form_data = {
        nazev: this.auction_name_field.value,
        vyvolavaci_cena: this.starting_price_field.value,
        min_prihoz: this.min_bid_field.value,
        pravidlo: this.rule_field.value,
        typ: this.type_field.value,
        min_ucastniku: this.min_participants_field.value,
        object: this.object_field.value,
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