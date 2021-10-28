<template>
  <div
    class="dropdown"
    @mouseenter="show_dropdown_fn"
    @mouseleave="hide_dropdown_fn"
  >
    <button class="min-w-min whitespace-nowrap h-6 px-4 rounded">
      {{ text }}
    </button>
    <div
      class="dropdown-content drop-shadow-lg"
      :class="{ hidden: !show_dropdown }"
    >
      <div
        class="
          absolute
          top-0
          min-w-min
          h-8
          bg-bggradstart
          rounded-t-lg
          text-gray-800
          px-4
          py-1
          cursor-pointer
        "
      >
        <router-link
          :to="{
            name: 'Auctions',
            params: { category: text },
          }"
          @click="hide_dropdown_fn"
        >
          {{ text }}
        </router-link>
      </div>
      <ul
        class="
          absolute
          top-full
          left-0
          right-0
          bg-bggradstart
          rounded-lg
          z-10
          px-20
          py-8
        "
      >
        <router-link
          v-for="subcategory in subcategories"
          :key="subcategory"
          :to="{
            name: 'Auctions',
            params: { category: text, subcategory: subcategory },
          }"
          @click="hide_dropdown_fn"
        >
          <li class="border border-red-500 rounded text-lg my-1 p-1">
            {{ subcategory }}
          </li>
        </router-link>
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
      show_dropdown: false,
    };
  },
  methods: {
    hide_dropdown_fn: function (e) {
      this.show_dropdown = false;
    },
    show_dropdown_fn: function (e) {
      this.show_dropdown = true;
    },
  },
};
</script>

<style>
</style>