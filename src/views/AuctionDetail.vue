<template>
  <h1>The detail {{ deez }} -{{ id }}-</h1>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      deez: false,
      id: undefined,
    };
  },
  methods: {},
  created: function () {
    this.id = this.$route.params.id;
  },
};
</script>

<style>
</style>