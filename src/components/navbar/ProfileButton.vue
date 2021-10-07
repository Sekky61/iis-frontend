<template>
  <router-link :to="{ name: link_target_name }">
    <button class="h-8 bg-red-primary rounded px-5 filter drop-shadow">
      <slot></slot>
    </button>
  </router-link>
</template>

<script>
export default {
  props: ["link_target_name"],
};
</script>

<style>
</style>