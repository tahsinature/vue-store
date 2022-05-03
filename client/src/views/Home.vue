<template>
  <div class="home-root mt-4 mb-4">
    <app-loading
      :active.sync="isLoading"
      :is-full-page="false"
      :loader="'bars'"
      :background-color="'#172029'"
      :transition="'.1s fade'"
    ></app-loading>
    <app-search
      @onShowCategory="$modal.show('category')"
      @onShowLocation="$modal.show('location')"
      :currentLocation="currentLocation"
      :currentCategory="currentCategory"
    ></app-search>
    <modal name="location">
      <app-location
        @onSelectLocation="
          query.location = $event;
          $modal.hide('location');
        "
      ></app-location>
    </modal>
    <modal name="category">
      <app-category
        :query="query"
        @onSelectCategory="
          query.category = $event;
          $modal.hide('category');
        "
      ></app-category>
    </modal>
    <!-- <hr> -->
    <div v-if="!products" class="container no-prods">
      <img src="https://www.animalboosternutrition.com/images/no-magento-product-found.jpg" alt />
    </div>
    <div class="container prods-holder" v-else>
      <app-product-preview
        v-for="product in products"
        :key="product._id"
        :product="product"
      ></app-product-preview>
      <app-pagination
        :pageNumber="pageNumber"
        :hasNextPage="hasNextPage"
        @next="pageNumber++"
        @previous="pageNumber--"
        @first="pageNumber = 1"
      ></app-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import ProductPreviewVue from "../components/ProductTile.vue"
import HomeSearchBarVue from "../components/HomeSearchBar.vue"
import CategoryVue from "../components/modals/Category.vue"
import LocationVue from "../components/modals/Location.vue"
import PaginationControlVue from "../components/PaginationControl.vue"
import { productController } from "../api"

export default {
  data() {
    return {
      isLoading: false,
      pageNumber: 1,
      hasNextPage: undefined,
      query: {
        category: undefined,
        location: undefined,
      },
      currentLocation: "All over the world",
      currentCategory: "All Catrgories",
    }
  },
  components: {
    "app-product-preview": ProductPreviewVue,
    "app-search": HomeSearchBarVue,
    "app-category": CategoryVue,
    "app-location": LocationVue,
    "app-pagination": PaginationControlVue,
  },
  computed: {
    ...mapGetters(["products"]),
  },
  methods: {
    getProducts(page, query) {
      // this.$store.dispatch('storeFetchedData', null);
      this.isLoading = true
      productController
        .getAllProducts(page, query)
        .then(result => {
          this.isLoading = false
          this.currentLocation = this.query.location ? this.query.location : "All over the world"
          this.currentCategory = this.query.category ? this.query.category : "All Catrgories"
          const { products } = result.data
          this.$store.dispatch("storeFetchedData", products)
          this.hasNextPage = result.data.paginationInfo.hasNextPage
        })
        .catch(({ response }) => {
          if (response.status === 404) {
            this.$store.dispatch("storeFetchedData", null)
            this.isLoading = false
          }
        })
    },
  },
  watch: {
    pageNumber() {
      this.getProducts(this.pageNumber, this.query)
    },
    query: {
      handler() {
        this.pageNumber = 1
        this.getProducts(this.pageNumber, this.query)
      },
      deep: true,
    },
  },
  created() {
    this.getProducts(this.pageNumber, this.query)
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";

.home-root {
  display: flex;
  flex-direction: column;
}

.prods-holder,
.no-prods {
  height: 100%;
  padding-left: 0;
  padding-right: 0;
  background: #fff;
  border: 2px solid gainsboro;
  border-radius: 5px;
  width: 70%;
  @include respond(df, tab-p) {
    width: 90%;
  }
  @include respond(df, mbl) {
    width: 100%;
  }
}
.no-prods {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  img {
    max-width: 300px;
    @include respond(df, mbl) {
      max-width: 200px;
    }
  }
}
</style>
