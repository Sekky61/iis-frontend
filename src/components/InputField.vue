<template>
  <div>
    <label class="text-grey-darker text-sm font-bold pl-1">dd </label>
    <input class="input-field" :type="type" :placeholder="placeholder" />
  </div>
  {{ cfg }}
</template>

<script>
export default {
  emits: ["update:cfg"],
  props: ["cfg"],
  data() {
    return { x: 5 };
  },
  calculated: {
    val() {
      return cfg.value;
    },
  },
};
</script>

<style>
</style>