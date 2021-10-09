<template>Kategorie {{ category }} - {{ subcategory }}</template>

<script>
export default {
  props: ["category_name"],
  data() {
    return {
      category: this.$route.params.category || "default category",
      subcategory: this.$route.params.subcategory || "default subcategory",
    };
  },
  watch: {
    $route(to, from) {
      // je potřeba sledovat změny routeru, jinak se nevyrenderuje změna
      this.category = to.params.category || "default c";
      this.subcategory = to.params.subcategory || "default s";
    },
  },
};
</script>

<style>
</style>