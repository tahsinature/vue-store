<template>
  <div class="container">
    <div class="profile-hint">
      <p>{{ $store.getters.getAdmin.userName }} is on Vue Store - Follow to stay updated!</p>
      <p>
        <i class="fas fa-globe-europe"></i>
        {{ host }}/profile/{{ $store.getters.getAdmin.userName }}
      </p>
    </div>
    <div class="post-an-ad">
      <router-link to="/products/new" tag="button" class="btn btn-block mt-3"
        >Post A New Ad</router-link
      >
    </div>
    <div class="stats mt-3">
      <div class="stat">
        <h3>{{ myProducts.length }}</h3>
        <p>Products</p>
      </div>
      <div class="stat">
        <h3>{{ onSell }}</h3>
        <p>On Sell</p>
      </div>
      <div class="stat">
        <h3>{{ totalLikes }}</h3>
        <p>Likes</p>
      </div>
      <div class="stat">
        <h3>{{ totalReviews }}</h3>
        <p>Reviews</p>
      </div>
    </div>
    <hr />
    <div class="card-deck">
      <app-card v-for="product in myProducts" :key="product._id" :product="product"></app-card>
    </div>
  </div>
</template>

<script>
import eventBus from "../main";
import MyProductsCardVue from "../components/MyProductsCard.vue";
import { authController } from "../api";
import store from "../store/store";
import config from "../config";

export default {
  data() {
    return {
      myProducts: [],
      host: config.apiURL,
    };
  },
  components: {
    "app-card": MyProductsCardVue,
  },
  computed: {
    onSell() {
      const nonSoldItems = this.myProducts.filter((ele) => !ele.isSold);
      return nonSoldItems.length;
    },
    totalLikes() {
      let likes = 0;
      this.myProducts.filter((ele) => {
        likes += ele.likes;
      });
      return likes;
    },
    totalReviews() {
      let reviews = 0;
      this.myProducts.filter((ele) => {
        reviews += ele.reviews.length;
      });
      return reviews;
    },
  },
  created() {
    authController.getUser(this.$store.getters.getAdmin._id).then((res) => {
      const admin = res.data;
      this.myProducts = admin.products;
    });
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
.card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
}
.post-an-ad button {
  background: #3f51b5d4;
  color: #fff;
  &:hover {
    background: #3f51b5e6;
  }
}
.profile-hint {
  margin-top: 2rem;
  font-size: 0.9rem;
  border-radius: 10px;
  overflow: hidden;
  p:first-of-type {
    min-height: 7rem;
    background: #fff;
    padding: 1rem 0.7rem;
    color: #9c9c9c;
  }
  p:last-of-type {
    i {
      margin-right: 0.5rem;
    }
    color: #fff;
    padding: 0.4rem 0.7rem;
    background: #20202033;
  }
}
.stats {
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  overflow: hidden;
  .stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    color: #4e4e4e;
    &:hover {
      background: transparent;
    }
    width: 25%;
    @include respond(df, tab-p) {
      width: 50%;
    }
    border: 1px solid #e7edee;
    height: 5rem;
    h3 {
      margin: 0;
    }
  }
}
</style>
