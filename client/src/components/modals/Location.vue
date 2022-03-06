<template>
  <div class="modal-location">
    <div class="location-container">
      <p class="title">Select Location</p>
      <ul class="left">
        <li>
          <span>
            <i class="fas fa-globe-asia"></i>
          </span>
          All over the world
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          Asia
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          Australia
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          Africa
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          North-America
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          South-America
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          Europe
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
          Antartica
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$el.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', () => {
        const location = li.textContent.trim(' ');
        this.$emit('onSelectLocation', location);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/main";
.modal-location {
  padding: 3rem;
  @include respond(df, mbl) {
    padding: 1rem;
  }
  font-size: 0.8rem;
  .location-container {
    .title {
      font-size: 1.2rem;
      color: #4b4f50d3;
      margin-left: 0.5rem;
      margin-bottom: 0.5rem;
    }
    ul {
      list-style: none;
      li {
        &:first-of-type {
          border-top: 1px solid rgba(71, 60, 60, 0.192);
        }
        border-bottom: 1px solid rgba(71, 60, 60, 0.192);
        padding: 0.4rem 0.5rem;
        color: #0074ba;
        cursor: pointer;
        transition: color 0.1s;
        // justify-content: space-between;
        &:hover {
          color: #00547e;
          & > i:last-of-type {
            transition: all 0.3s;
            color: #00547e;
            transform: translateX(5px);
          }
        }
        span {
          display: inline-block;
          width: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
