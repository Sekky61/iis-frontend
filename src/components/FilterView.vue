<template>
  <div class="flex justify-center gap-3 shadow-3xl">
    <div class="w-64 rounded bg-bgbox pt-4 p-2">
      <slot name="side"></slot>
    </div>
    <div class="bg-bgbox max-w-4xl rounded p-4 min-h-400">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "subcategory"],
  name: "filter-view",
};
</script>

<style>
</style>