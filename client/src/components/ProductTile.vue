<template>
  <div class="product-preview" @click="gotoDetails">
    <div class="product-preview__left">
      <img
        class="product-preview__left--img"
        v-lazy="product.images[0].url"
      />
    </div>
    <div class="product-preview__right" ref="textSpace">
      <div class="product-preview__right__details">
        <marquee-text :repeat="1" :paused="!shouldScroll">
          <p ref="titleText" class="title">
            {{ product.title }}
          </p>
        </marquee-text>
        <p class="location text-muted" style="white-space: nowrap">
          {{ product.location }} - {{ product.category }} - {{ product.condition }}
        </p>
        <p class="price">${{ product.price }}</p>
      </div>
      <div class="product-preview__right__time">
        <small class="text-muted">{{ product.createdAt | moment("from", "now") }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shouldScroll: false,
    }
  },

  mounted() {
    const parentWidth = this.$refs.textSpace.offsetWidth
    const textWidth = this.$refs.titleText.scrollWidth

    this.shouldScroll = textWidth > parentWidth
  },

  props: ["product"],
  methods: {
    gotoDetails() {
      this.$router.push(`products/${this.product._id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
.product-preview {
  display: flex;
  align-items: center;
  height: 120px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.267);
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }

  &__left {
    height: 100%;
    padding: 5px;
    border: 1px solid rgba(167, 167, 167, 0.295);
    &--img {
      width: 150px;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
  &__right {
    // background: rgba(255, 0, 0, 0.185);
    padding: 0.2rem 1rem 0.2rem 1.5rem;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1rem;
    &__details {
      .title {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #0074ba;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          color: #00547e;
        }
      }
      .location {
        font-size: 0.9rem;
      }
      .price {
        font-size: 0.9rem;
        font-weight: bold;
      }
    }
    &__time {
      align-self: flex-end;
    }
  }
}
</style>
