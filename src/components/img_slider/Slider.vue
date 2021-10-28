<template>
  <div class="slider">
    <slide>
      <image
        v-for="(slide, index) in slides"
        :key="slide"
        :idx="index"
        :visibleSlide="visibleSlide"
      >
        <img :src="slide" />
      </image>
    </slide>
  </div>
</template>

<script>
import Slide from "./Slide.vue";
import Image from "./Image.vue";

export default {
  components: {
    Slide,
    Image,
  },
  data() {
    return {
      slides: ["/resources/panMisa.webp"],
      visibleSlide: 0,
    };
  },
};
</script>


