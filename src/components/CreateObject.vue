<template>
  <div>
    <!-- vytvoření objektu, pro účely přihození účasti v aukci -->
    <h2 class="text-lg">Informace o objektu</h2>

    <label class="text-sm font-bold pl-1">Název</label>
    <input
      v-model="name"
      class="input-field w-96"
      type="text"
      placeholder="Byt 1+kk 40m^2"
      @blur.capture="validate_name"
      @keyup="emit_object"
      :class="{ 'input-incorrect': !name_valid }"
    />

    <label class="text-sm font-bold pl-1">Adresa</label>
    <input
      v-model="address"
      class="input-field w-96"
      type="text"
      placeholder="Božetěchova 11, Brno"
      @blur.capture="validate_address"
      @keyup="emit_object"
      :class="{ 'input-incorrect': !address_valid }"
    />

    <label class="text-sm font-bold pl-1">Popis</label>
    <textarea
      v-model="description"
      class="input-field w-96 h-64"
      type="text"
      placeholder="Popis objektu"
      @blur.capture="validate_description"
      @keyup="emit_object"
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
</template>

<script>
export default {
  emits: ["objectData"],
  data() {
    return {
      name: "",
      address: "",
      description: "",

      file: null,

      name_valid: true,
      address_valid: true,
      description_valid: true,
    };
  },
  computed: {
    description_length() {
      return this.description.length;
    },
    object() {
      return {
        name: this.name,
        address: this.address,
        description: this.description,
        file: this.file,
      };
    },
  },
  methods: {
    emit_object() {
      this.$emit("objectData", this.object);
    },

    // also emits
    fileinputchange(e) {
      this.file = e.target.files[0];
      this.emit_object();
    },

    validate_name() {
      this.name_valid = this.name.length != 0;
    },
    validate_address() {
      this.address_valid = this.address.length != 0;
    },
    validate_description() {
      this.description_valid = this.description.length != 0;
    },
  },
};
</script>

<style>
</style>