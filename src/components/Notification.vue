<template>
  <!-- oznámení, varovné, error, oznámení pro úspěch(např. vytvoření aukce) -->
  <div
    :class="main_style"
    class="relative rounded-lg h-14 flex overflow-hidden justify-center"
  >
    <span class="flex-grow px-6 m-auto">{{ text }}</span>

    <div class="absolute w-full bottom-0 meter rounded-b h-1 opacity-50">
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
        return "bg-rednotif";
      } else if (this.urgency == "warning") {
        return "bg-yellownotif";
      } else {
        return "bg-greennotif";
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