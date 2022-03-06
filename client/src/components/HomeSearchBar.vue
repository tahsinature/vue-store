<template>
  <div class="search-section mb-1 container">
    <div class="left">
      <button class="special-button" @click="$emit('onShowLocation')">
        <i class="fas fa-map-marker-alt"></i>
        {{ currentLocation }}
      </button>
      <button class="special-button" @click="$emit('onShowCategory')">
        <i class="fas fa-tags"></i>
        {{ currentCategory }}
      </button>
    </div>
    <div class="right">
      <input type="text" placeholder="Search by product name, place, or even description" />
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentLocation", "currentCategory"],
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
.search-section {
  padding: 1rem;
  // background: #fff;
  display: flex;
  justify-content: space-between;
  button {
    cursor: pointer;
  }
  i {
    margin-right: 0.3rem;
  }
  @include respond(df, tab-l) {
    flex-direction: column;
    font-size: 0.8rem;
    width: 100%;
  }
  .left {
    @include respond(mf, tab-l) {
      width: 55%;
    }
    @include respond(df, tab-l) {
      margin-bottom: 1rem;
    }
    display: flex;
    justify-content: space-between;
    button {
      width: 49%;
      padding: 0.4rem;
    }
  }
  .right {
    @include respond(mf, tab-l) {
      width: 44%;
    }
    display: flex;
    padding: 0.2rem;
    background-image: linear-gradient(to bottom, #606c88, #3f4c6b);
    border-radius: 5px;
    // overflow: hidden;
    input {
      // max-width: 100%;
      flex-grow: 1;
      padding: 0.5rem;
    }
    .search-button {
      padding: 0.4rem 2rem;
      margin: 0 0.5rem;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:active,
      &:focus {
        outline: none;
      }
      i {
        transition: color 0.3s;
      }
      &:hover {
        color: #cecece;
      }
      // width: 8rem;
      @include respond(df, tab-l) {
        padding: 0.4rem 0.2rem;
      }
    }
  }
}

// ----

.special-button {
  border: 1px solid #8a66f4;
  -webkit-box-shadow: #cccccc 0px 1px 0px inset;
  -moz-box-shadow: #cccccc 0px 1px 0px inset;
  box-shadow: #cccccc 0px 1px 0px inset;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  font-size: 15px;
  font-family: arial, helvetica, sans-serif;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
  display: inline-block;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3);
  font-weight: bold;
  color: #ffffff;
  background-color: #606c88;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#606c88), to(#3f4c6b));
  background-image: -webkit-linear-gradient(top, #606c88, #3f4c6b);
  background-image: -moz-linear-gradient(top, #606c88, #3f4c6b);
  background-image: -ms-linear-gradient(top, #606c88, #3f4c6b);
  background-image: -o-linear-gradient(top, #606c88, #3f4c6b);
  background-image: linear-gradient(to bottom, #606c88, #3f4c6b);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#606c88, endColorstr=#3f4c6b);
}

.special-button:hover {
  border: 1px solid #9174ed;
  background-color: #4b546a;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#4b546a), to(#2c354b));
  background-image: -webkit-linear-gradient(top, #4b546a, #2c354b);
  background-image: -moz-linear-gradient(top, #4b546a, #2c354b);
  background-image: -ms-linear-gradient(top, #4b546a, #2c354b);
  background-image: -o-linear-gradient(top, #4b546a, #2c354b);
  background-image: linear-gradient(to bottom, #4b546a, #2c354b);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#4b546a, endColorstr=#2c354b);
}
</style>
