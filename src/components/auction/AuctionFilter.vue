<template>
  <div class="text-center text-xl pt-2 pb-4">Filtr</div>

  <div class="block px-4">
    <div class="mt-2 grid grid-cols-1 divide-y divide-yellow-500">
      <div class="py-4">
        <label class="pr-1">Název</label>
        <input
          class="w-32 rounded border border-theorange"
          type="text"
          v-model="filter_data.query"
        />
      </div>
      <div class="py-4">
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.schvalene"
          />
          <label class="ml-2">Aukce před začátkem</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.probihajici"
          />
          <label class="ml-2">Probíhající aukce</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.ukoncene"
          />
          <label class="ml-2">Ukončené aukce</label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.nabidkove"
          />
          <label class="ml-2">Nabídkové aukce</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.poptavkove"
          />
          <label class="ml-2">Poptávkové aukce</label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.uzavrene"
          />
          <label class="ml-2">Uzavřené aukce</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox"
            v-model="filter_data.otevrene"
          />
          <label class="ml-2">Otevřené aukce</label>
        </div>
      </div>
      <div class="py-4">
        Tagy pro kategorii
        <span class="underline">
          {{ category }}
        </span>
        <ul>
          <li v-for="sub in tag_hierarchy[category]" :key="sub">
            <input
              type="checkbox"
              class="checkbox"
              @change="tag_change(sub)"
              :checked="selected(sub)"
            />
            <label class="ml-2">{{ sub }}</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["filterChanged"],
  props: ["category", "subcategory", "filterObj"],
  data() {
    return {
      filter_data: this.filterObj,
    };
  },
  computed: {
    tag_hierarchy() {
      return this.$store.state.tag_hierarchy;
    },
  },
  watch: {
    subcategory(value, oldValue) {
      // todo cele doladit
      if (value) {
        this.filter_data.tagy = [value];
      } else {
        this.filter_data.tagy = [];
      }
    },
  },
  methods: {
    update_filter() {
      this.$emit("filterChanged", this.filter_data);
    },
    selected(sub) {
      return this.filter_data.tagy.indexOf(sub) >= 0;
    },
    tag_change(sub) {
      console.log("Change");
      console.log(sub);
      const index = this.filter_data.tagy.indexOf(sub);
      if (index < 0) {
        this.filter_data.tagy.push(sub);
      } else {
        this.filter_data.tagy.splice(index, 1);
      }
    },
  },
};
</script>

<style>
</style>