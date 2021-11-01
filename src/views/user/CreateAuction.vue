<template>
  <h1>Vytvořit novou aukci</h1>
  <input-field
    class="w-full"
    v-bind="auction_name_field"
    @fieldchange="auction_name_change"
  >
  </input-field>

  <input-field
    class="w-full"
    v-bind="object_field"
    @fieldchange="object_change"
  >
  </input-field>

  <div>
    Ousside input: {{ auction_name_field.value }} -- {{ object_field.value }}
  </div>
</template>

<script>
import InputField from "../../components/InputField.vue";

export default {
  components: { InputField },
  data() {
    return {
      auction_name_field: {
        label: "Název aukce",
        placeholder: "Prodej bytu 3+kk 86m2",
        value: "",
        type: "text",
      },

      object_field: {
        label: "Číslo objektu",
        placeholder: "např. 2",
        value: "",
        type: "number",
      },
    };
  },

  methods: {
    auction_name_change(e) {
      this.auction_name_field.value = e;
    },
    object_change(e) {
      this.object_field.value = e;
    },
  },
};
</script>

<style>
</style>