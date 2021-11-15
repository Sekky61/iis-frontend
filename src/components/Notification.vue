<template>
  <div
    class="
      border border-theyellow
      rounded
      h-16
      text-lg
      flex
      items-center
      justify-center
    "
    :class="main_style"
  >
    <span class="flex-grow px-4">{{ text }}</span>
    <button class="w-16 h-16 rounded-r bg-red-500" @click="close">x</button>
  </div>
</template>

<script>
export default {
  props: [
    "text", // message
    "urgency", // one of: error, warning, success - used for styling
  ],
  data() {
    return {
      main_style: this.get_main_style(),
    };
  },
  methods: {
    close() {
      this.$store.commit("close_notif", this.text);
    },
    get_main_style() {
      if (this.urgency == "error") {
        return "bg-red-500";
      } else if (this.urgency == "warning") {
        return "bg-yellow-600";
      } else {
        return "bg-green-400";
      }
    },
  },
};
</script>

<style>
</style>