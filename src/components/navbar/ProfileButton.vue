<template>
  <router-link :to="{ name: link_target_name }">
    <button class="h-8 px-5 border-2 border-black border-opacity-50 text-white transition duration-500 ease-in-out rounded-2xl bg-red-primary hover:bg-red-200 transform hover:-translate-y-1 hover:scale-110 hover:text-black">
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