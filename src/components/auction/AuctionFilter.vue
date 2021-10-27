<template>
  <div>The filter component</div>
  <div>{{ category }}</div>
  <div>{{ subcategory }}</div>
</template>

<script>
export default {
  props: ["category", "subcategory"],
};
</script>

<style>
</style>