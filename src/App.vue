<template>
  <navbar></navbar>
      <div class="bg-bgcolor mx-auto max-w-4xl rounded p-4 min-h-400"> 
      <router-view />
  </div>

  <div class="object-contain flex justify-center w-auto">
    <Slider></Slider>
  </div>
  

  <footer class="w-full mt-6 bg-bgcolor p-6">
    <div class="flex justify-center">
      <div class="w-32 h-32 bg-red-700 mx-4 rounded">footer1</div>
      <div class="w-32 h-32 bg-red-700 mx-4 rounded">footer2</div>
      <div class="w-32 h-32 bg-red-700 mx-4 rounded">footer3</div>
    </div>
  </footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";
import Slider from "./components/img_slider/Slider.vue";
import Slide from "./components/img_slider/Slide.vue";
import Image from "./components/img_slider/Image.vue";


export default {
  name: "App",
  components: { Navbar, Slider, Slide, Image},
  data() {
    return {};
  },
};
</script>



<style>
</style>
