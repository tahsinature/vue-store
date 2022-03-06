<template>
  <div class="backdrop-cart" @click="isShown = false" :class="{'backdrop-cart-show': isShown}">
    <div class="cart" :class="{'show-cart': isShown}" @click.stop>
      <div class="container">
        <div class="header text-center">
          <h3 class="text-center">Items in your Bag</h3>
          <button
            class="btn btn-sm"
            :class="{'btn-success': cartStatus === 'saved', 'btn-primary': cartStatus === 'loaded', 'btn-danger': cartStatus === 'change', }"
            @click="saveCart()"
            v-if="saveStatus"
          >{{saveStatus}}</button>
        </div>
        <hr>
        <div class="cart-products">
          <app-cart-product v-for="item in getCartItems" :key="item._id" :item="item"></app-cart-product>
        </div>
        <div class="cart-content">
          <div class="non-empty" v-if="getCartItems.length > 0">
            <hr>
            <div class="cart-calculation text-right">
              <p>Bag subtotal: ${{totalCartPrice.toFixed(2)}}</p>
              <p class="text-danger">Free Shipping: 0.00</p>
              <p class="text-primary">Estimated Tax: 0.00</p>
              <hr>
              <h4>Total ${{totalCartPrice.toFixed(2)}}</h4>
            </div>
            <hr>
            <div class="checkout">
              <button class="btn btn-primary">Checkout</button>
            </div>
          </div>
          <div class="empty" v-else>
            <h4 class="mb-4">Cart is empty</h4>
            <img src="https://freelor.com/images/cart-empty.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import eventBus from '../main';
import CartProductVue from './CartProduct.vue';

export default {
  data() {
    return {
      isShown: false,
      backdrop: false,
    };
  },
  components: {
    'app-cart-product': CartProductVue,
  },
  methods: {
    saveCart() {
      this.$store.dispatch('saveCart');
    },
  },
  computed: {
    ...mapGetters(['getCartItems', 'totalCartPrice', 'cartStatus']),
    saveStatus() {
      if (this.cartStatus === 'loaded') return 'Data Loaded From Your Account';
      if (this.cartStatus === 'saved') return 'Cart Saved';
      if (this.cartStatus === 'change') return 'Save Cart';
      return null;
    },
  },
  mounted() {
    eventBus.$on('onShowCart', () => {
      this.isShown = !this.isShown;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main.scss";
.backdrop-cart {
  background: $backdrop-bg;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.2s, opacity 0.2s;
  z-index: 90;
}
.backdrop-cart-show {
  opacity: 1;
  visibility: visible;
}
.cart {
  padding-top: 5rem; //For Top Header
  transform: translateX(100%);
  transition: transform 0.2s;
  background-color: #eee;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  // max-width: 400px;
  @include respond(df, mbl) {
    width: 100%;
  }
  .cart-products {
    max-height: 50vh;
    overflow-y: scroll;
  }
  .cart-calculation {
    width: 70%;
    margin-left: auto;
    p {
      font-weight: bold;
    }
  }
  .checkout {
    text-align: right;
  }
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // height: 100vh;
  // background: pink;
  img {
    width: 100%;
  }
}
.show-cart {
  transform: translateX(0);
}
</style>
