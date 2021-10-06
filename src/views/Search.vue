<template>search view, search param: {{ q_param }}</template>

<script>
export default {
  data() {
    return {
      q_param: this.$route.query.q,
    };
  },

  watch: {
    // reakce na změnu parametrů cesty
    // https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
    $route(to, from) {
      this.q_param = this.$route.query.q;
    },
  },
};
</script>

<style>
</style>