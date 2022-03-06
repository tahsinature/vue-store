<template>
  <div class="container product-details mt-4 mb-4" v-if="product">
    <notifications group="auth" position="bottom right" animation-type="velocity"></notifications>
    <modal name="confirm-delete">
      <modal-delete
        :product="product"
        @onDeleteConfirm="removeProduct()"
        @onDeleteCancel="$modal.hide('confirm-delete');"
      ></modal-delete>
    </modal>
    <div class="product-details__top">
      <div class="product-details__top__image text-center">
        <app-image-slider :images="product.images"></app-image-slider>
        <p>({{product.images.length}} {{product.images.length > 1 ? "images" : "image"}})</p>
      </div>
      <div class="product-details__top__content">
        <h1 class="text-center">{{product.title}}</h1>
        <router-link
          :to="`/profile/${product.author._id}`"
          tag="small"
          class="text-muted"
          style="cursor: pointer"
        >
          <i class="fas fa-user-shield"></i>
          {{product.author.fullName}}
        </router-link>
        <br>
        <small class="text-muted">
          <i class="fas fa-clock mr-1"></i>
          {{product.createdAt | moment("dddd, MMMM Do YYYY")}}
        </small>
        <br>
        <small class="text-muted">
          <i class="fas fa-list-ul mr-1"></i>
          {{product.category}}
        </small>
        <br>
        <small class="text-muted">
          <i class="fas fa-battery-full mr-1" v-if="product.condition === 'new'"></i>
          <i class="fas fa-battery-half mr-1" v-else></i>
          {{product.condition}}
        </small>
        <div class="like-box" v-if="!product.isSold">
          <button class="btn btn-sm btn-primary mt-2 mb-2" @click="toggleLike()">
            <i v-if="isLiked" class="fas fa-thumbs-up"></i>
            <i v-else class="far fa-thumbs-up"></i>
            {{product.likes}} {{isLiked ? "Unlike" : "Like"}}
          </button>
          <button
            class="btn btn-secondary btn-sm ml-2 flex-grow-1"
            @click="markAsSold(product._id)"
            v-if="isAdmin"
          >Mark As Sold</button>
        </div>
        <div class="review-box" ref="reviewBox" v-if="!product.isSold">
          <a class="mr-3">{{product.reviews.length}} Reviews</a>
          <a
            @mouseenter="$refs.reviewBox.style.backgroundColor = '#f44336'; $refs.reviewBox.style.borderColor = '#f44336'"
            @mouseleave="$refs.reviewBox.style.backgroundColor = '#00bcd4'; $refs.reviewBox.style.borderColor = '#00bcd4'"
            @click="turnOnReviewMode()"
          >Add Your Review</a>
        </div>
        <div class="product-details__top__content--price">
          <h1>${{Number(product.price).toFixed(2)}}</h1>
          <div v-if="!product.isSold">
            <p>IN STOCK</p>
            <p>SKU#: 23-WBK92</p>
          </div>
          <div v-if="product.isSold" class="stock-out">
            <p>Out of stock</p>
          </div>
        </div>
        <div class="action-non-admin" v-if="!isAdmin && !product.isSold">
          <div class="input-group add-to-cart">
            <input
              type="number"
              class="form-control text-center"
              placeholder="Quantity"
              aria-describedby="button-addon2"
              v-model.number="addToCartQty"
            >
            <div class="input-group-append">
              <button
                class="btn btn-success"
                type="button"
                id="button-addon2"
                @click="addToCart()"
              >Add To Cart</button>
            </div>
          </div>
          <button class="btn btn-primary contact" @click="isContactShown = true">
            <i class="fas fa-phone"></i>
            {{isContactShown ? product.author.contactNo : `${product.author.contactNo.substr(0, 5) + ' (Click to show)'}`}}
          </button>
        </div>
        <div class="controller" v-else>
          <button class="btn btn-outline-info" @click="editProduct()" v-if="!product.isSold">
            <i class="fas fa-edit"></i>
            Edit Product
          </button>
          <button class="btn btn-danger" v-if="isAdmin" @click="$modal.show('confirm-delete')">
            <i class="fas fa-trash-alt"></i>
            Remove Product
          </button>
        </div>
      </div>
    </div>

    <div class="product-details__bottom" v-if="!product.isSold">
      <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item" @click="mode = 'description'">
              <a class="nav-link" :class="{active: mode === 'description'}">Description</a>
            </li>
            <li class="nav-item" @click="mode = 'review'">
              <a
                class="nav-link"
                :class="{active: mode === 'review'}"
              >Reviews ({{product.reviews.length}})</a>
            </li>
            <li class="nav-item" @click="mode = 'makeReview'" v-if="!isAdmin">
              <a class="nav-link" :class="{active: mode === 'makeReview'}">Make Review</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="card-body__description" v-if="mode === 'description'">
            <p style="white-space:pre-wrap" class="text-left">{{product.description}}</p>
          </div>
          <div class="card-body__review" v-if="mode === 'review'">
            <div class="comments">
              <app-comment
                v-for="(review, index) in product.reviews"
                :review="review"
                :key="index"
                @onRemove="removeReview($event)"
                @onLike="likeReview($event)"
              ></app-comment>
            </div>
          </div>
          <div class="card-body__review" v-if="mode === 'makeReview' && !isAdmin">
            <div class="form-group">
              <textarea
                rows="3"
                class="form-control"
                data-gramm_editor="false"
                v-model="reviewText"
                id="reviewBox"
              ></textarea>
              <button
                class="btn btn-outline-secondary btn-block mt-3"
                @click="makeReview()"
                :disabled="!reviewText"
              >Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- temp -->
    <!-- <div class="text-center mt-5">
      <button class="btn btn-primary" @click="isAdmin = !isAdmin">Role Switcher</button>
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import socket from 'socket.io-client';
import { productController, reviewController, likeController } from '../api';
import ProductDetailsImageVue from '../components/ProductDetailsImage.vue';
import CommentVue from '../components/Comment.vue';
import DeleteConfirmationVue from '../components/modals/DeleteConfirmation.vue';
import eventBus from '../main';
import config from '../config';

const socketOn = socket(config.apiURL);

export default {
  components: {
    'app-image-slider': ProductDetailsImageVue,
    'app-comment': CommentVue,
    'modal-delete': DeleteConfirmationVue,
  },
  data() {
    return {
      product: null,
      mode: 'description',
      addToCartQty: 1,
      isAdmin: false,
      reviewText: '',
      isContactShown: false,
    };
  },
  methods: {
    turnOnReviewMode() {
      if (this.isAdmin) {
        return this.$emit('onNotify', {
          title: 'Oops, Review on own product 😟',
          text: "Sorry, you can't review your own product",
          type: 'error',
        });
      }
      this.mode = 'makeReview';
      this.$router.push('#reviewBox');
      this.$router.push('');
    },
    toggleLike() {
      if (this.isAdmin) {
        return this.$emit('onNotify', {
          title: 'Oops, Like on own product 😟',
          text: "Sorry, you can't like your own product",
          type: 'error',
        });
      }
      if (!this.$store.getters.isLoggedIn) {
        return eventBus.$emit('onNotify', {
          title: 'Authentication Needed',
          text: "You've to be logged in to like a product.",
          type: 'error',
        });
      }
      likeController
        .toggleLike({
          productId: this.product._id,
          likerId: this.getAdmin._id,
        })
        .then(({ data }) => {
          if (data === 'Liked') {
            this.$store.dispatch('likeProduct', this.getAdmin._id);
          } else if (data === 'Disliked') {
            this.$store.dispatch('dislikeProduct', this.getAdmin._id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makeReview() {
      const vm = this;
      function failNotify() {
        vm.$emit('onNotify', {
          title: 'Failed to review on this product',
          text: 'Something went wrong with your authentication',
          type: 'error',
        });
      }
      const review = {
        productId: this.product._id,
        text: this.reviewText,
      };
      reviewController
        .makeReview(review)
        .then(({ data }) => {
          this.reviewText = '';
          this.mode = 'review';
          socketOn.emit('onReviewMade', review.productId, data);
        })
        .catch(({ response }) => {
          failNotify();
          // console.log(response);
          window.location.reload();
        });
    },
    removeReview(id) {
      reviewController.removeReview(id).then(({ data }) => {
        this.product.reviews.splice(
          this.product.reviews.indexOf(
            this.product.reviews.find(ele => ele._id === id),
          ),
          1,
        );
      });
    },
    likeReview(id) {
      if (!this.$store.getters.isLoggedIn) {
        return eventBus.$emit('onNotify', {
          title: 'Authentication Needed',
          text: "You've to be logged in to like a review.",
          type: 'error',
        });
      }
      reviewController
        .likeReview(id)
        .then(() => {})
        .catch(() => {
          eventBus.$emit('onNotify', {
            title: 'Failed To Like this review',
            text: 'Please try again later',
            type: 'error',
          });
        });
    },
    editProduct() {
      this.$router.push(`/products/${this.product._id}/edit`);
    },
    async markAsSold(id) {
      productController.markAsSold(id).then(({ data, status }) => {
        if (status === 200) {
          this.product.isSold = true;
          return eventBus.$emit('onNotify', {
            type: 'success',
            title: 'Congratulations on your sell.',
            text: `You just sold your product <strong style="color: yellow;">${
              data.title
            }</strong>`,
          });
        }
        eventBus.$emit('onNotify', {
          type: 'error',
          title: 'Mark as sold failed',
          text: 'Something went wrong.',
        });
      });
    },
    async removeProduct() {
      productController
        .deleteProduct(this.product._id)
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch('removeProduct', this.product._id);
            this.$router.push('/');
          }
        })
        .catch(() => {
          this.$notify({
            group: 'auth',
            type: 'error',
            title: "You're Unauthorized",
            text:
              "Don't try to manupulate the posts that doesn't belong to you.",
          });
        });
    },
    addToCart() {
      if (!this.$store.getters.isLoggedIn) {
        return eventBus.$emit('onNotify', {
          title: 'Authentication Needed',
          text: "You 've to be logged in to use cart.",
          type: 'error',
        });
      }
      this.$store.dispatch('addToCart', {
        quantity: this.addToCartQty,
        target: this.product,
      });
      this.addToCartQty = 1;
    },
    getSelectedProductFromStore() {
      if (this.getSelectedProduct) {
        this.product = this.getSelectedProduct;
        if (this.getAdmin) {
          // eslint-disable-next-line no-multi-spaces
          return (this.isAdmin =            this.getAdmin._id === this.getSelectedProduct.author._id);
        }
        this.isAdmin = false;
      }
    },
  },
  deactivated() {
    this.$destroy();
  },
  computed: {
    ...mapGetters(['getSelectedProduct', 'getAdmin']),
    isLiked() {
      return this.getAdmin
        ? this.getSelectedProduct.likers.includes(this.getAdmin._id)
        : false;
    },
  },
  watch: {
    $route(to, from) {
      this.getSelectedProductFromStore();
    },
  },
  created() {
    this.getSelectedProductFromStore();
  },
  mounted() {
    socketOn.on('onReviewMade', (productId, review) => {
      if (productId === this.product._id) {
        this.product.reviews.unshift(review);
      }
    });
    socketOn.on('newNotification', (notification, adminId, createdPackage) => {
      if (
        notification.notificationType === 'review-like'
        && notification.product._id === this.product._id
      ) {
        this.product.reviews
          .find(ele => ele._id === createdPackage._id)
          .likers.push(notification.user._id);
      }
      if (
        notification.notificationType === 'review-unlike'
        && notification.product._id === this.product._id
      ) {
        this.product.reviews
          .find(ele => ele._id === createdPackage._id)
          .likers.pop(notification.user._id);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_media.scss";

.product-details {
  font-family: "Roboto Condensed", sans-serif;
  .product-details__top {
    display: grid;
    align-items: center;
    grid-template-columns: 400px 1fr;
    grid-gap: 5rem;
    @include respond(df, tab-l) {
      grid-template-columns: minmax(50%, 1fr) 1fr;
    }
    @include respond(df, tab-p) {
      grid-gap: 0;
      grid-template-columns: minmax(50%, 1fr);
    }
    &__image {
      @include respond(df, tab-p) {
        justify-self: center;
        width: 80%;
      }
      border-radius: 5px;
      overflow: hidden;
      margin-right: 2rem;

      @include respond(df, tab-p) {
        margin-right: 0;
      }
      p {
        font-size: 0.8rem;
        color: rgb(65, 28, 28);
        background: rgba(0, 0, 0, 0.151);
        padding: 0.5rem 0;
      }
    }
    &__content {
      @include respond(df, mbl) {
        padding: 0 3rem;
      }
      @include respond(df, tab-p) {
        margin-top: 2rem;
      }
      @include respond(mf, 1366px) {
        padding: 0 7rem;
      }
      h1 {
        font-family: "Josefin Sans", sans-serif;
        @include respond(df, tab-p) {
          margin-bottom: 1rem;
        }
        font-size: 2rem;
        font-weight: 300;
      }
      .like-box {
        display: flex;
        align-items: center;
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover i {
            transform: scale(1.2);
          }
        }
        i {
          font-size: 1.2rem;
          margin-right: 0.3rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-right: 0.4rem;
        }
      }
      .review-box {
        background: #00bcd4;
        text-align: center;
        display: flex;
        border: 1px solid #00bcd4;
        border-radius: 5px;
        overflow: hidden;
        margin-top: 0.4rem;
        transition: all 0.3s;
        a {
          padding: 0.2rem 0;
        }
        a:first-of-type {
          background: #e7edee;
          width: 40%;
        }
        a:last-of-type {
          color: #e7edee;
          cursor: pointer;
          margin: auto;
        }
      }
      .action-non-admin {
        text-align: center;
        .btn.contact {
          margin-bottom: 1rem;
        }
        .add-to-cart {
          width: 70%;
          margin: 1rem auto;
        }
      }
      .controller {
        margin: 1rem auto;
        text-align: center;
        button {
          margin-bottom: 0.5rem;
        }
        button:first-of-type {
          margin-right: 1rem;
          margin-left: 1rem;
        }
      }
      &--price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(167, 167, 167, 0.541);
        border-bottom: 1px solid rgba(167, 167, 167, 0.541);
        padding: 0.5rem 0;
        margin-top: 2rem;
        .stock-out {
          background: #c82333;
          padding: 0.3rem;
          color: #fff;
          font-size: 1.5rem;
          border-radius: 5px;
        }
        div {
          font-size: 0.8rem;
          text-align: right;
        }
        h1 {
          font-weight: bold;
          margin: 0;
        }
      }
    }
  }
  .product-details__bottom {
    margin-top: 2rem;
    @include respond(df, tab-p) {
      font-size: 0.9rem;
    }
  }
}
.card-header-tabs {
  @include respond(df, mbl) {
    font-size: 0.8rem;
  }
  li {
    cursor: pointer;
  }
}
</style>
