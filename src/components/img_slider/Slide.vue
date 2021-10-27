<template>
  <div v-show="visibleSlide === idx" class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["visibleSlide", "idx"],
  data() {
    return {};
  },
};
</script>

<style>
</style>
