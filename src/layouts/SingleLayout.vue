<template>
  <div class="mt-6 bg-bgbox mx-auto max-w-4xl rounded p-4 min-h-400 shadow-3xl">
    <router-view /> 
    <!-- router view se nazhradí za stránku-->
  </div>
</template>

<script>
export default {
  name: "single-view",
};
</script>

<style>
</style>