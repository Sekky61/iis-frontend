<template>
  <div class="text-center text-xl pt-2 pb-4">Filtr</div>

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
          <li v-for="sub in category_tags" :key="sub">
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
      <div class="py-4">
        Další tagy
        <div>
          <input
            class="w-32 rounded border border-theyellow"
            type="text"
            v-model="add_tag_field"
          />
          <button
            @click="add_tag_filter"
            class="ml-2 bg-theyellow rounded px-1"
          >
            Přidat
          </button>
        </div>
        <ul>
          <!-- todo remove on reload/redirection? -->
          <li v-for="tag in additional_tags" :key="tag">
            <input
              type="checkbox"
              class="checkbox"
              @change="tag_change(tag)"
              :checked="selected(tag)"
            />
            <label class="ml-2">{{ tag }}</label>
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
      add_tag_field: "",
      additional_tags: [],
    };
  },
  computed: {
    category_tags() {
      if (this.category) {
        return this.$store.state.tag_hierarchy[this.category].tags;
      } else {
        return [];
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
    add_tag_filter() {
      this.filter_data.tagy.push(this.add_tag_field);
      this.additional_tags.push(this.add_tag_field);
      this.add_tag_field = "";
    },
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