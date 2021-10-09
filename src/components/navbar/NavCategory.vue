<template>
  <div @mouseover="expanded = true" @mouseleave="expanded = false">
    <button
      class="w-auto h-6 px-4 hover:bg-red-800 rounded"
      @click="drop_down = !drop_down"
    >
      {{ text }}
    </button>
    <div
      class="absolute top-200 w-32 bg-bgcolor rounded-lg"
      :class="{ invisible: !expanded }"
    >
      <ul>
        <li
          v-for="subcategory in subcategories"
          :key="subcategory"
          class="px-4"
        >
          <router-link
            :to="{
              name: 'Auctions',
              params: { category: text, subcategory: subcategory },
            }"
          >
            {{ subcategory }}
          </router-link>
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
      expanded: false,
    };
  },
};
</script>

<style>
</style>