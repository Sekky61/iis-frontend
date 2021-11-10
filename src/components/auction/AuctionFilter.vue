<template>
  <div class="text-center text-lg">
    <div>The filter component</div>
    <div>{{ category }} > {{ subcategory }}</div>
  </div>

  <button class="p-2 bg-theorange rounded" @click="update_filter">
    Filtrovat
  </button>

  <div class="block py-10 px-4">
    <div class="mt-2 grid grid-cols-1 divide-y divide-yellow-500">
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" checked />
            <span class="ml-2">Probíhající aukce</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" checked />
            <span class="ml-2">Ukončené aukce</span>
          </label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">Nabídkové aukce</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">Poptávkové aukce</span>
          </label>
        </div>
      </div>
      <div class="py-4">
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
            <span class="ml-2">Uzavřené aukce</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input type="checkbox" class="form-checkbox" />
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
  emits: ["update:filterObj"],
  props: ["category", "subcategory", "filterObj"],
  data() {
    return {
      filter_data: {
        probihajici: true,
        ukoncene: true,
        nabidkove: true,
        poptavkove: true,
        uzavrene: true,
        otevrene: true,
      },
    };
  },
  methods: {
    update_filter() {
      this.$emit("update:filterObj", this.filter_data);
    },
  },
};
</script>

<style>
</style>