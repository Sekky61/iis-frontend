<template>
  <div @mouseenter="show_dropdown_fn" @mouseleave="hide_dropdown_fn">
    <button class="whitespace-nowrap h-6 px-4 rounded">
      {{ text }}
    </button>
    <div class="shadow-lg" :class="{ hidden: !show_dropdown }">
      <div
        class="
          rounded-t-lg
          absolute
          top-0.5
          min-w-min
          h-10
          bg-theorange
          text-gray-800
          px-4
          pt-0.5
          pb-1
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
      <ul class="absolute -ml-8 top-10 max-w-lg bg-theorange rounded-lg p-4">
        <router-link
          v-for="subcategory in subcategories"
          :key="subcategory"
          :to="{
            name: 'Auctions',
            params: { category: text, subcategory: subcategory },
          }"
          @click="hide_dropdown_fn"
        >
          <li
            class="
              bg-theyellow
              rounded
              border border-black
              text-lg
              my-1
              p-1
              w-32
              text-gray-800 text-center
            "
          >
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