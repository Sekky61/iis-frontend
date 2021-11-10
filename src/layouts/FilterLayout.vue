<template>
  <div class="flex justify-center gap-3">
    <div class="w-64 rounded bg-bgbox pt-4 p-2">
      <router-view
        name="side"
        :filterObj="filterObj"
        @filterChanged="filterObj = $event"
      />
    </div>
    <div class="bg-bgbox max-w-4xl rounded p-4 min-h-400">
      <router-view :filterObj="filterObj"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "subcategory"],
  name: "filter-view",
  data() {
    return {
      filterObj: {
        probihajici: true,
        ukoncene: true,
        nabidkove: true,
        poptavkove: true,
        uzavrene: true,
        otevrene: true,
        tagy: [],
      },
    };
  },
};
</script>

<style>
</style>