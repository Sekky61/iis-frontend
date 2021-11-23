<template>
  <h1 class="text-2xl m-2">Vytvořit novou aukci</h1>

  <form id="new_auction_form" @submit.prevent="processForm" class="m-8">
    <div class="grid grid-cols-2">
      <div class="p-4">
        <h2 class="text-lg">Pravidla aukce</h2>
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

        <label class="text-sm font-bold pl-1 tooltip">
          Pravidlo aukce
          <span class="tooltiptext"
            >Otevřená - Každý zná aktuální cenu a nabídky ostatních.
            <hr />
            Uzavřená - Dražitelé neznají nabídky ostatních účastníků. Každý smí
            nabídnout jen jednou.</span
          >
        </label>
        <select
          @blur.capture="validate_rule"
          :class="{ 'input-incorrect': !rule_valid }"
          v-model="rule"
          class="block"
        >
          <option value="uzavrena">Uzavřená</option>
          <option value="otevrena">Otevřená</option>
        </select>

        <label class="text-sm font-bold pl-1 tooltip">
          Typ aukce
          <span class="tooltiptext"
            >Nabídková - dražitel má předmět a ostatní se přehazují
            <hr />
            Poptávková - dražitel chce předmět a ostatní se podhazují</span
          >
        </label>
        <select
          @blur.capture="validate_type"
          :class="{ 'input-incorrect': !type_valid }"
          v-model="type"
          class="block"
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
      </div>
      <div class="p-4">
        <h2 class="text-lg">Informace o objektu</h2>

        <label class="text-sm font-bold pl-1">Adresa</label>
        <input
          v-model="address"
          class="input-field w-96"
          type="text"
          placeholder="Božetěchova 11, Brno"
          @blur.capture="validate_address"
          :class="{ 'input-incorrect': !address_valid }"
        />

        <label class="text-sm font-bold pl-1">Popis</label>
        <textarea
          v-model="description"
          class="input-field w-96 h-64"
          type="text"
          placeholder="Popis objektu"
          @blur.capture="validate_description"
          :class="{ 'input-incorrect': !description_valid }"
        />
        <span :class="{ 'text-red-500': !description_valid }"
          >Délka popisu: {{ description_length }}/500</span
        >
        <label class="text-sm block font-bold pl-1 mt-4"
          >Obrázek objektu (volitelný)</label
        >
        <input
          class="mt-2"
          @change="fileinputchange"
          type="file"
          id="myFile"
          name="filename"
        />
      </div>
      <div class="col-span-2">
        <h2 class="text-xl">Tagy</h2>
        <h3 class="text-lg mt-3">Kategorie</h3>
        <div class="flex gap-2">
          <div
            v-for="(tag_group, group_name) in tag_hierarchy"
            :key="tag_group"
            class="tag"
            :class="{ 'tag-selected': group_name == selected_category }"
            @click="click_category(group_name)"
          >
            {{ group_name }}
          </div>
        </div>
        <h3 class="text-lg mt-3">Tagy</h3>
        <div class="flex gap-2 flex-wrap">
          <div
            v-for="tag in tag_hierarchy[selected_category].tags"
            :key="tag"
            class="tag"
            :class="{ 'tag-selected': selected_tags.includes(tag) }"
            @click="click_tag(tag)"
          >
            {{ tag }}
          </div>
        </div>
      </div>
      {{ selected_tags }}
      <div class="flex items-center justify-center col-span-2 mt-8">
        <submit-button>Založit aukci</submit-button>
      </div>
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
      // auction_name, starting_price, min_bid, rule, type, min_participants

      auction_name: "",
      starting_price: "",
      min_bid: "",
      rule: "",
      type: "",
      min_participants: "",

      address: "",
      description: "",

      file: "",

      auction_name_valid: true,
      starting_price_valid: true,
      min_bid_valid: true,
      rule_valid: true,
      type_valid: true,
      min_participants_valid: true,

      address_valid: true,
      description_valid: true,

      selected_category: "Domy",
      selected_tags: [],
    };
  },

  computed: {
    starting_price_int() {
      return parseInt(this.starting_price);
    },

    min_bid_int() {
      return parseInt(this.min_bid);
    },

    min_participants_int() {
      return parseInt(this.min_participants);
    },

    description_length() {
      return this.description.length;
    },

    tag_hierarchy() {
      return this.$store.state.tag_hierarchy;
    },
  },

  methods: {
    ...mapActions(["create_auction", "new_notif", "send_auction_picture"]),

    fileinputchange(e) {
      this.file = e.target.files[0];
    },

    init_tags() {
      const cat_main_tag =
        this.tag_hierarchy[this.selected_category].category_tag;
      this.selected_tags = cat_main_tag ? [cat_main_tag] : [];
    },

    click_category(cat_name) {
      this.selected_category = cat_name;
      const cat_main_tag = this.tag_hierarchy[cat_name].category_tag;
      this.selected_tags = cat_main_tag ? [cat_main_tag] : [];
    },

    click_tag(tag) {
      const index = this.selected_tags.indexOf(tag);
      if (index != -1) {
        // is in array
        this.selected_tags.splice(index, 1);
      } else {
        this.selected_tags.push(tag);
      }
    },

    validate_auction_name() {
      this.auction_name_valid = this.auction_name.length != 0;
    },
    validate_starting_price() {
      this.starting_price_valid = this.starting_price_int > 0;
    },
    validate_min_bid() {
      this.min_bid_valid = this.min_bid_int > 0;
    },
    validate_rule() {
      console.log(`rule be: ${this.rule}`);
      this.rule_valid = this.rule == "otevrena" || this.rule == "uzavrena";
    },
    validate_type() {
      this.type_valid = this.type == "nabidkova" || this.type == "poptavkova";
    },
    validate_min_participants() {
      this.min_participants_valid = this.min_participants_int >= 0;
    },

    validate_address() {
      this.address_valid = this.address.length != 0;
    },
    validate_description() {
      this.description_valid = this.description.length != 0;
    },

    form_valid() {
      this.validate_auction_name();
      this.validate_starting_price();
      this.validate_min_bid();
      this.validate_rule();
      this.validate_type();
      this.validate_min_participants();

      this.validate_address();
      this.validate_description();

      return (
        this.auction_name_valid &&
        this.starting_price_valid &&
        this.min_bid_valid &&
        this.rule_valid &&
        this.type_valid &&
        this.min_participants_valid &&
        this.address_valid &&
        this.description_valid
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
        vyvolavaci_cena: this.starting_price_int,
        min_prihoz: this.min_bid_int,
        pravidlo: this.rule,
        typ: this.type,
        min_ucastniku: this.min_participants_int,
        adresa: this.address,
        popis: this.description,
        tagy: this.selected_tags,
      };

      let file = "todo";
      let file_being_sent = true;

      const response = await this.create_auction(form_data);

      if (response.success) {
        const auction_id = response.data;

        this.new_notif({
          text: response.message,
          urgency: "success",
        });

        if (file_being_sent) {
          const pic_response = await this.send_auction_picture({
            auction_id,
            file: this.file,
          });

          if (pic_response) {
            this.new_notif({
              text: pic_response.message,
              urgency: "success",
            });
          } else {
            this.new_notif({
              text: pic_response.message,
              urgency: "error",
            });
          }
        }
      } else {
        // error popup
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }
    },
  },
  mounted() {
    this.init_tags();
  },
};
</script>

<style>
</style>