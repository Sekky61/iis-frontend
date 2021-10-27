<template>
  <navbar></navbar>
  
      <div class="bg-bgcolor mx-auto max-w-4xl rounded p-4 min-h-400"> 
      <router-view />
  </div>
  


  <footer class="w-full mt-6 bg-bgcolor p-6">
    <div class="flex justify-center">
      <div class="w-16 h-16 bg-red-700 mx-4 rounded">footer1</div>
      <div class="w-16 h-16 bg-red-700 mx-4 rounded"><img src="/resources/vut.jpg" alt="vut image"/></div>
      <div class="w-16 h-16 bg-red-700 mx-4 rounded">footer3</div>
    </div>
  </footer>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue";


export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },
};
</script>



<style>
</style>
