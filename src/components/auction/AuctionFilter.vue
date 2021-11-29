<template>
  <div class="text-center text-xl pt-2 pb-4">Filtr</div>

  <!-- filtrování pomocí jednotlivých tagů a stavu akcí -->
  <div class="block px-4">
    <div class="mt-2 grid grid-cols-1 divide-y divide-yellow-500">
      <div class="py-4">
        <label class="pr-1">Název</label>
        <input
          class="w-32 rounded border border-theyellow"
          type="text"
          v-model="filter_data.query"
        />
      </div>
      <div class="py-4">
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.schvalene"
          />
          <label class="ml-2">Aukce před začátkem</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.probihajici"
          />
          <label class="ml-2">Probíhající aukce</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.ukoncene"
          />
          <label class="ml-2">Ukončené aukce</label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.nabidkove"
          />
          <label class="ml-2">Nabídkové aukce</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.poptavkove"
          />
          <label class="ml-2">Poptávkové aukce</label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.uzavrene"
          />
          <label class="ml-2">Uzavřené aukce</label>
        </div>
        <div>
          <input
            type="checkbox"
            class="checkbox w-4 h-4"
            v-model="filter_data.otevrene"
          />
          <label class="ml-2">Otevřené aukce</label>
        </div>
      </div>
      <div class="py-4">
        Tagy {{ category ? "pro kategorii" : "" }}
        <span class="underline">
          {{ category }}
        </span>
        <ul>
          <!-- tagy aukcí -->
          <li v-for="sub in category_tags" :key="sub">
            <input
              type="checkbox"
              class="checkbox w-4 h-4"
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
    category_tags() {
      if (this.category) {
        return this.$store.state.tag_hierarchy[this.category].tags;
      } else {
        return this.$store.state.all_tags;
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.query.q) {
        this.filter_data.query = to.query.q;
      } else {
        this.filter_data.query = "";
      }

      if (from.name != to.name || !to.params.category) {
        this.filter_data.tagy = [];
        return;
      }

      this.filter_data.tagy = [];
      if (this.$store.state.tag_hierarchy[to.params.category].category_tag) {
        this.filter_data.tagy.push(
          this.$store.state.tag_hierarchy[to.params.category].category_tag
        );
      }

      if (to.params.subcategory) {
        this.filter_data.tagy.push(to.params.subcategory);
      }
    },
  },
  methods: {
    selected(sub) {
      return this.filter_data.tagy.indexOf(sub) >= 0;
    },
    tag_change(sub) {
      const index = this.filter_data.tagy.indexOf(sub);
      if (index < 0) {
        this.filter_data.tagy.push(sub);
      } else {
        this.filter_data.tagy.splice(index, 1);
      }
    },
  },
  mounted() {
    if (this.$route.params.subcategory == null) {
      if (!this.$route.params.category) {
        this.filterObj.tagy = [];
        return;
      }
      let tag =
        this.$store.state.tag_hierarchy[this.$route.params.category]
          .category_tag;
      if (tag) {
        this.filterObj.tagy = [
          this.$store.state.tag_hierarchy[this.$route.params.category]
            .category_tag,
        ];
      } else {
        this.filterObj.tagy = [];
      }
    } else {
      this.filterObj.tagy = [
        this.$store.state.tag_hierarchy[this.$route.params.category]
          .category_tag,
        this.$route.params.subcategory,
      ];
    }
  },
};
</script>

<style>
</style>