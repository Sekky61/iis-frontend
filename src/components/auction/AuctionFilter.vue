<template>
  <div class="text-center text-lg">
    <div>The filter component</div>
    <div>{{ category }} > {{ subcategory }}</div>
  </div>

  <div class="block py-10 px-4">
    <div class="mt-2 grid grid-cols-1 divide-y divide-yellow-500">
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              v-model="filter_data.probihajici"
            />
            <span class="ml-2">Probíhající aukce</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              v-model="filter_data.ukoncene"
            />
            <span class="ml-2">Ukončené aukce</span>
          </label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              v-model="filter_data.nabidkove"
            />
            <span class="ml-2">Nabídkové aukce</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              v-model="filter_data.poptavkove"
            />
            <span class="ml-2">Poptávkové aukce</span>
          </label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              v-model="filter_data.uzavrene"
            />
            <span class="ml-2">Uzavřené aukce</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              v-model="filter_data.otevrene"
            />
            <span class="ml-2">Otevřené aukce</span>
          </label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">....</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">...</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">...</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">...</span>
          </label>
        </div>
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
  methods: {
    update_filter() {
      this.$emit("filterChanged", this.filter_data);
    },
  },
};
</script>

<style>
</style>