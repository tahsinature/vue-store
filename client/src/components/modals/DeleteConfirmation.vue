<template>
  <div class="container">
    <div class="left">
      <h4>{{product.title}}</h4>
      <hr>
      <img
        v-lazy="(product.images[0]) ? product.images[0].url : 'https://www.shopgro.in/img/no-image.png'"
        alt
      >
      <hr>
      <div class="statistic">
        <div class="statistic-box">
          <i class="fas fa-heart"></i>
          <span>{{product.likes}}</span>
        </div>
        <div class="statistic-box">
          <i class="fas fa-comment-dots"></i>
          <span>{{product.reviews.length}}</span>
        </div>
      </div>
    </div>

    <div class="text-center right">
      <div class="mb-3">
        <h3 class="text-danger">Remove</h3>
        <p>This ad is active for last 9 days.
          <br>Are you sure deleting this ad?
        </p>
      </div>
      <button class="btn btn-outline-secondary" @click="cancelDelete()">Cancel</button>
      <button class="btn btn-danger" @click="confirmDelete()">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    cancelDelete() {
      this.$emit('onDeleteCancel');
    },
    confirmDelete() {
      this.$emit('onDeleteConfirm');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/main";
.container {
  padding: 1rem;
  display: flex;
  justify-content: center;
  @include respond(df, tab-p) {
    flex-direction: column;
  }
  // height: 100%;
  align-items: center;
  text-align: center;
  .left {
    h4 {
      font-family: "Josefin Sans", sans-serif;
      color: brown;
    }
    img {
      width: 50%;
      height: 50%;
      object-fit: cover;
      border-radius: 10px;
    }
    .statistic {
      display: flex;
      color: brown;
      font-size: 1.2rem;
      i {
        margin-right: 0.3rem;
      }
      &-box {
        padding: 0.4rem;
        width: 50%;
        &:first-of-type {
          background: #eee;
        }
        &:last-of-type {
          background: rgb(248, 250, 228);
        }
      }
    }
  }
  .right {
    button:first-of-type {
      margin-right: 0.4rem;
    }
    .text-danger {
      margin-top: 1rem;
      @include respond(df, tab-p) {
        margin-bottom: -0.5rem;
      }
    }
    p {
      @include respond(df, tab-p) {
        margin: 1rem 0;
      }
    }
  }
  & > * {
    width: 50%;
    @include respond(df, tab-p) {
      width: 80%;
    }
    @include respond(df, mbl) {
      width: 100%;
    }
  }
}
</style>
