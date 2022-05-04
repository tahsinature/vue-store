<template>
  <div class="nav">
    <div class="container">
      <div class="left" @click="toggleNav()">
        <img class="logo" src="../assets/images/logo.png" alt>
          <h5>Vue Store</h5>
      </div>
      <div class="api-docs">
        <a :href="apiDocURL" target="_blank">
          API Docs
        </a>
      </div>
      <div class="right" @click="showCart()">
        <p class="my-cart">
          <i class="fas fa-cart-plus">
            <span
              class="badge badge-secondary"
              :class="{'badge-priority': numOfItemInCart > 0 }"
            >{{numOfItemInCart}}</span>
          </i>
          (${{totalCartPrice.toFixed(2)}})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import config from "../config"
import eventBus from "../main"

export default {
  data() {
    return {
      apiDocURL: `${config.apiURL}/docs/rest?format=html`,
    }
  },
  methods: {
    toggleNav() {
      eventBus.$emit("onToggleNav")
    },
    showCart() {
      if (this.$store.getters.isLoggedIn) {
        eventBus.$emit("onShowCart")
      } else {
        eventBus.$emit("onNotify", {
          title: "Authentication Needed",
          text: "You 've to be logged in to use cart.",
          type: "error",
        })
      }
    },
  },
  computed: {
    ...mapGetters(["totalCartPrice", "numOfItemInCart"]),
  },
}
</script>


<style lang="scss" scoped>
@import "../assets/sass/main";
$hover-color: rgba(255, 255, 255, 0.425);
.nav {
  background: $nav-bg;
  color: #fff;
  z-index: 100;
  // position: relative;

  // optional-start
  position: sticky;
  width: 100vw;
  top: 0;
  left: 0;
  // optional-start

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > * {
      padding: 1rem 1rem;
      cursor: pointer;
      &:hover {
        background: rgb(46, 46, 46);
      }
    }
    .left {
      &:hover {
        color: red;
        border-left: 2px solid $hover-color;
        border-right: 2px solid $hover-color;
        color: rgb(65, 185, 131);
      }
      display: flex;
      border-right: 1px solid rgb(56, 56, 56);
      border-left: 2px solid transparent;
      align-items: center;
      h5 {
        margin: 0;
        @include respond(df, tab-p) {
          font-size: 1rem;
        }
        transition: color 0.2s;
        // on hover change parent style
      }

      .logo {
        height: 2rem;
        margin-right: 0.5rem;
        @include respond(df, tab-p) {
          height: 1.5rem;
        }
      }
    }
    .api-docs {
      margin-right: auto;
      padding: 0;
      align-self: flex-end;
      margin-left: 0.5rem;
      margin-bottom: 0.5rem;
      a {
        text-decoration: none;
        color: #fff;
        padding: 4px;
        border-radius: 5px;
        font-size: 0.5rem;
        transition: background-color 0.2s;
        border: 1px solid rgb(65, 185, 131);
        text-decoration: none;
        &:hover {
          background-color: rgb(65, 185, 131);
        }
        &:visited {
          color: #fff;
          text-decoration: none;
        }
      }
    }
    .right {
      border-right: 2px solid transparent;
      border-left: 1px solid rgb(56, 56, 56);
      &:hover {
        border-right: 2px solid $hover-color;
        border-left: 2px solid $hover-color;
      }
      .my-cart {
        i {
          font-size: 2rem;
          position: relative;
          @include respond(df, tab-p) {
            font-size: 1.7rem;
          }
          span {
            position: absolute;
            top: -50%;
            right: -50%;
            font-size: 50%;
          }
        }
      }
    }
  }
}
.badge-priority {
  background-color: #007bff !important;
}
</style>
