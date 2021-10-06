<template>
  <div>
    <button
      class="w-auto h-6 rounded-lg bg-red-200 mx-1 px-4 hover:bg-red-300"
      @click="drop_down = !drop_down"
    >
      {{ text }}
    </button>
    <div
      class="absolute top-200 w-32 bg-bgcolor rounded-lg"
      :class="{ invisible: !drop_down }"
    >
      <ul>
        <li
          v-for="subcategory in subcategories"
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
  props: ["text", "router_name", "subcategories"], // v-bind na objektu rozebere objekt na jednotlivé položky
  data() {
    return {
      drop_down: false,
    };
  },
};
</script>

<style>
</style>