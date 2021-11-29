<template>
  <!-- potvrzovací tlačítko -->
  <button
    class="
      bg-theyellow
      hover:bg-theorange hover:text-gray-100
      active:bg-red-800
      text-black
      font-bold
      py-2
      px-4
      rounded-full
      border border-theorange
      mb-6
    "
    type="submit"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style>
</style>