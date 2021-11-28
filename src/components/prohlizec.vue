

<template>
  <div class="relative rounded">
    <!-- preload -->
    <link
      v-for="image in slides_src"
      :key="image"
      :href="image"
      rel="somthing"
      type="something"
    />
    <img
      :src="slides_src[active_slide]"
      alt="slideshow"
      class="h-full w-full rounded"
      style="object-fit: cover"
    />
    <div class="absolute top-0 w-full h-full flex items-center justify-evenly">
      <div
        class="
          w-10
          h-10
          rounded-full
          bg-theyellow
          mx-4
          hover:bg-theorange
          cursor-pointer
        "
        @click="prev_image"
      >
        <img
          class="w-6 m-2 transform rotate-180"
          src="/resources/arrow-right.svg"
        />
      </div>
      <div class="flex-grow"></div>
      <div
        class="
          w-10
          h-10
          rounded-full
          bg-theyellow
          mx-4
          hover:bg-theorange
          cursor-pointer
        "
        @click="next_image"
      >
        <img class="w-6 m-2" src="/resources/arrow-right.svg" />
      </div>
    </div>

    <div class="absolute bottom-3 flex justify-center w-full gap-2">
      <input
        v-for="n in slides_count"
        :key="n"
        type="radio"
        :value="n - 1"
        v-model="active_slide"
        class="
          appearance-none
          w-4
          h-4
          rounded-full
          border-2 border-red-200
          bg-theyellow
          hover:bg-red-700
          checked:bg-theorange
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active_slide: 0,

      // sources of photos (welcome page)
      slides_src: [
        "/resources/hero/hero1.jpg",
        "/resources/hero/hero2.jpg",
        "/resources/hero/hero3.jpg",
      ],
    };
  },
  computed: {
    slides_count() {
      return this.slides_src.length;
    },
  },
  methods: {
    next_image() {
      this.active_slide = (this.active_slide + 1) % this.slides_count;
    },
    prev_image() {
      if (this.active_slide == 0) {
        this.active_slide = this.slides_count - 1;
      } else {
        this.active_slide -= 1;
      }
    },
  },
};
</script>
