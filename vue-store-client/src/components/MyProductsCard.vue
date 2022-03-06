<template>
  <div class="card" @click="gotoDetails()">
    <img
      v-lazy="(product.images[0]) ? product.images[0].url : 'https://www.shopgro.in/img/no-image.png'"
      class="card-img-top img-thumbnail"
    >
    <div class="card-body">
      <div class="sold-badge" v-if="product.isSold">Sold</div>
      <h5 class="card-title">{{product.title}}</h5>
      <p class="card-text">${{product.price}}</p>
      <div class="d-flex justify-content-between">
        <p class="card-text">
          <i class="fas fa-map-pin"></i>
          {{product.location}}
        </p>
        <p>Used</p>
      </div>

      <div class="card-text card-text-bottom mt-2 img-thumbnail">
        <div class="card-text-bottom__left rounded">
          <small class="text-center">{{product.createdAt | moment("from", "now")}}</small>
        </div>
        <div class="card-text-bottom__right">
          <div>
            <i class="fas fa-heart"></i>
            <span>{{product.likes}}</span>
          </div>
          <div>
            <i class="fas fa-comment-dots"></i>
            <span>{{product.reviews.length}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    gotoDetails() {
      this.$router.push(`/products/${this.product._id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main.scss";
.card {
  border-radius: 5px;
  width: 250px;
  margin: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  img {
    height: 300px;
    object-fit: cover;
    @include respond(df, mbl) {
      height: 250px;
    }
  }
  &:hover {
    transform: scale(1.02);
    transform-origin: top;
    box-shadow: 0 -10px 2rem 0.5rem rgba($color: #000000, $alpha: 0.03);
    background: rgba(0, 255, 128, 0.164);
  }
}
.card-body {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  .card-title {
    margin-bottom: 0.3rem;
  }

  .card-text-bottom {
    margin-top: auto;
    // border-radius: 0 0 1rem 1rem;
    display: flex;
    overflow: hidden;
    &__left {
      background: rgb(127, 157, 197);
      width: 50%;
    }
    &__right {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      color: #fff;
      i {
        margin-right: 0.2rem;
      }
    }
    background: rgb(161, 187, 221);
    small {
      padding: 0.5rem 0.5rem;
      display: block;
      color: #fff;
    }
  }
}
.sold-badge {
  background: red;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0, -100%);
  padding: 0 0.7rem;
  font-family: "ZCOOL QingKe HuangYou", cursive;
  border-radius: 8px 0 0 0;
}
</style>
