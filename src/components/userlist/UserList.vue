<template>
  <div class="rounded w-full bg-theyellow">
    <div class="h-8 p-2">Table name</div>
    <div class="grid grid-cols-1 gap-1 m-2 pb-2">
      <user-item v-for="user in users" :key="user" v-bind="user"></user-item>
    </div>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  props: ["users"],
  components: { UserItem },
  data() {
    return {};
  },
};
</script>

<style>
</style>