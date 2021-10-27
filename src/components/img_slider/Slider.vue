<template>
    <div class="slider">
        <slide>
            <image v-for="(slide,index) in slides" :key="slide" :index="index" :visibleSlide="visibleSlide">
                <img :src="slide"/>
            </image>
        </slide>
    </div>
</template>

<script>
import Slide from "./Slide.vue";
import Image from "./Image.vue";

export default{
    data() {
        return{
            slides: [
                '/resources/panMisa.png',
            ],
            visibleSlide : 0,
        }   
    },
    components : {
        Slide, Image,
    }
}
</script>


