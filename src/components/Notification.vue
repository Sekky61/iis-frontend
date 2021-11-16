<template>
  <div class="rounded">
    <div
      class="h-10 text-lg flex items-center justify-center border border-black"
      :class="main_style"
    >
      <span class="flex-grow px-4">{{ text }}</span>
      <button class="w-10 h-10 rounded-tr bg-red-500" @click="close">x</button>
    </div>
    <div class="meter rounded-b">
      <span><span class="progress bg-theyellow rounded-b"></span></span>
    </div>
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
.meter {
  height: 5px;
  position: relative;
  background: #000;
  overflow: hidden;
}

.meter span {
  display: block;
  height: 100%;
}

.progress {
  background-color: #fff;
  animation: progressBar 4s ease-in-out;
  animation-fill-mode: both;
}

@keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>