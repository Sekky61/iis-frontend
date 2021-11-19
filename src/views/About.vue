<template>
  <div class="about">
    <h1 v-for="i in items" :key="i">This is an about page</h1>
  </div>
</template>

<script>
export default {
  // todo link to docs
  data() {
    return {
      items: [...Array(60).keys()],
    };
  },
};
</script>
