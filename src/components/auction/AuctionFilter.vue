<template>
  <div class="text-center text-lg">
    <div>The filter component</div>
    <div>{{ category }} > {{ subcategory }}</div>
  </div>

  <div class="block py-10 px-4">
    <div class="mt-2 grid grid-cols-1 divide-y divide-yellow-500">
      <div class="py-4">
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
        {{ category }}
        <ul>
          <li v-for="sub in tag_hierarchy[category]" :key="sub">
            <input type="checkbox" class="checkbox" @change="tag_change(sub)" />
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
  methods: {
    update_filter() {
      this.$emit("filterChanged", this.filter_data);
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

  created() {
    this.tag_change(this.subcategory);
  },
};
</script>

<style>
</style>