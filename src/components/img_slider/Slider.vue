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


export default {
  components: {
  
  },
  data() {
    return {
      slides: ["/resources/panMisa.webp"],
      visibleSlide: 0,
    };
  },
};
</script>


