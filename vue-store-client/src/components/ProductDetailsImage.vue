<template>
  <app-slick class="imageContainer" :options="slickOptions">
    <img v-for="image in images" v-lazy="image.url" :key="image._id">
    <!-- <img v-for="image in images" :src="image.url" :key="image._id"> -->
  </app-slick>
</template>

<script>
import Slick from 'vue-slick';

export default {
  props: ['images'],
  components: {
    'app-slick': Slick,
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        arrows: false,
        // variableWidth: true,
        // centerMode: true,
        // variableHeight: true,
        // draggable: true,
        // infinite: true,
        // accessibility: true,
        // adaptiveHeight: false,
        // dots: true,
        // edgeFriction: 0.3,
        // swipe: true,
      },
    };
  },
  methods: {
    // next() {
    //   this.$refs.slick.next();
    // },
    // prev() {
    //   this.$refs.slick.prev();
    // },
    // reInit() {
    //   // Helpful if you have to deal with v-for to update dynamic lists
    //   this.$refs.slick.reSlick();
    // },
  },
};
</script>


<style lang="scss" scoped>
@import "../assets/sass/main";
@import url("../../node_modules/slick-carousel/slick/slick.scss");
.imageContainer {
  position: relative;
  img {
    height: 300px;
    object-fit: cover;
    @include respond(df, tab-l) {
      height: 200px;
    }
    @include respond(df, tab-l) {
      height: 200px;
    }
  }
}
</style>
