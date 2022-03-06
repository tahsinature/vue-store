<template>
  <div class="single-image-box">
    <!-- <img :src="image" class="img-thumbnail"> -->
    <img v-lazy="image" class="img-thumbnail">
    <div class="delete-img" @click="removeImage()">
      <i class="fas fa-trash"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
  methods: {
    removeImage() {
      this.$emit('onImageRemove');
    },
  },
};
</script>

<style lang="scss" scoped>
.single-image-box {
  display: inline-block;
  margin: 0 0.5rem;
  position: relative;
  &:hover {
    .delete-img {
      transform: scale(1.2);
      transform-origin: top right;
    }
  }
  img {
    height: 100px;
  }
  .delete-img {
    position: absolute;
    right: 0;
    top: 0;
    background: rgb(255, 255, 255);
    padding: 0.5rem;
    border-radius: 0 0 0 1rem;
    transition: all 0.3s;
    &:hover {
      color: red;
    }
    cursor: pointer;
    i {
      transition: all 0.1s;
    }
  }
}
</style>
