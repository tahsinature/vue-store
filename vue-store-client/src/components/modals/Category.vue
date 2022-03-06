<template>
  <div class="modal-categories">
    <div class="category-container">
      <p class="title">Select Category</p>
      <ul class="left">
        <li>All Categories</li>
        <li>
          <span>
            <i class="fas fa-mobile"></i>
          </span>
          Mobiles
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-tv"></i>
          </span>
          Electronics
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-car"></i>
          </span>
          Vehicles
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-home"></i>
          </span>
          Property
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-briefcase"></i>
          </span>
          Jobs
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-tools"></i>
          </span>
          Services
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-couch"></i>
          </span>
          Home & Living
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-glasses"></i>
          </span>
          Fashion, Health & Beauty
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-futbol"></i>
          </span>
          Hobbies, Sports & Kids
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-industry"></i>
          </span>
          Business & Industry
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-graduation-cap"></i>
          </span>
          Education
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-dog"></i>
          </span>
          Pets & Animals
          <i class="fas fa-chevron-right float-right mr-2"></i>
        </li>
        <li>
          <span>
            <i class="fas fa-carrot"></i>
          </span>
          Food & Agriculture
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
        const category = li.textContent.trim(' ');
        this.$emit('onSelectCategory', category);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/main";
.modal-categories {
  padding: 3rem;
  @include respond(df, mbl) {
    padding: 1rem;
  }
  font-size: 0.8rem;
  .category-container {
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
