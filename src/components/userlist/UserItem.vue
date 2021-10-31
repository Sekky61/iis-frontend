<template>
  <div class="rounded bg-bgbox flex">
    <div class="bg-red-500 w-1/12 p-1">
      {{ iduzivatele }}
    </div>
    <div class="bg-yellow-500 w-1/6 p-1">{{ username }}</div>
    <div class="bg-red-500 w-1/6 p-1">{{ jmeno }}</div>
    <div class="bg-yellow-500 w-1/6 p-1">{{ prijmeni }}</div>
    <div class="bg-red-500 w-1/6 p-1">{{ email }}</div>
    <div class="bg-yellow-500 w-1/6 p-1">{{ typ }}</div>
    <div class="bg-red-500 w-1/12 flex">
      <div class="w-1/2 p-1">X</div>
      <div class="w-1/2 p-1">X</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["iduzivatele", "username", "jmeno", "prijmeni", "email", "typ"],
  computed: {
    cpv: function (val) {
      return this.username;
    },
  },
};
</script>

<style>
</style>