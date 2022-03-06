<template>
  <div class="cart-product">
    <div class="cart-product__left">
      <h4 class="cart-product__title">{{item.title}}</h4>
      <!-- <small class="cart-product__id text-muted">Prod id: {{item._id}}</small> -->
      <!-- <p class="text-danger" @click="removeFromCart()">Remove</p> -->
      <button class="btn btn-sm btn-danger" @click="removeFromCart()">Remove Item</button>
    </div>
    <div class="cart-product__right">
      <div class="cart-product__quantity">
        <input class="cart-product__quantity__input" type="number" v-model.number="item.quantity">
      </div>
      <div class="cart-product__price text-right">
        <div class="unit-price">
          <p>Unit Price:</p>
          <p>${{Number(item.price).toFixed(2)}}</p>
          <!-- <small class="text-muted">Unit Price: ${{Number(item.price).toFixed(2)}}</small> -->
        </div>
        <div class="total-price">
          <h6>${{item.totalPrice().toFixed(2)}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  props: ['item'],
  methods: {
    removeFromCart() {
      // eslint-disable-next-line no-underscore-dangle
      this.$store.dispatch('removeFromCart', this.item._id);
    },
  },
  created() {
    // console.log(this.item);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
.cart-product {
  padding: 0.4rem;
  &:not(:last-of-type) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image: linear-gradient(
      to right,
      #cccccc1f 0%,
      #bdbdbd93 50%,
      #cccccc1f 100%
    );
    border-image-slice: 1;
  }
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  &__left {
    // max-width: 30%;
    .cart-product__title {
      font-size: 1.2rem;
      @include respond(df, mbl) {
        font-size: 1rem;
      }
    }
    .btn-danger {
      font-size: 0.7rem;
    }
  }
  &__right {
    display: flex;
    align-items: center;
    .cart-product__quantity {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      overflow: hidden;
      &__input {
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 0.2rem;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .unit-price {
      color: #949494;
      font-size: 0.7rem;
      margin-bottom: 0.4rem;
    }
    .cart-product__price {
      margin-left: 1rem;
    }
  }
}
</style>
