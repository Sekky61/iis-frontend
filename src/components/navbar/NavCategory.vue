<template>
  <div class="dropdown">
    <button class="min-w-min whitespace-nowrap h-6 px-4 rounded">
      {{ text }}
    </button>
    <div class="dropdown-content hidden drop-shadow-lg">
      <div
        class="
          absolute
          top-0
          min-w-min
          h-8
          bg-bgcolor
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
          bg-bgcolor
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
    };
  },
};
</script>

<style>
.dropdown:hover .dropdown-content {
  display: block;
}
</style>