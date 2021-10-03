<template>
  <div>
    <button
      class="w-auto h-6 rounded-lg bg-red-200 mx-1 px-4 hover:bg-red-300"
      @click="drop_down = !drop_down"
    >
      {{ nav_data.text }}
    </button>
    <div class="absolute top-200 w-32 bg-red-500 rounded-lg" v-if="drop_down">
      <ul>
        <li
          v-for="subcategory in nav_data.subcategories"
          :key="subcategory"
          class="px-4"
        >
          {{ subcategory }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nav_data"],
  data() {
    return {
      drop_down: false,
    };
  },
};
</script>

<style>
</style>