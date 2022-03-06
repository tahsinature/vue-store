<template>
  <div class="pagination-control">
    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': pageNumber <= 1}">
          <a class="page-link" @click="$emit('first')">First Page</a>
        </li>
        <li class="page-item" v-if="pageNumber > 1">
          <a class="page-link" @click="$emit('previous')">{{pageNumber - 1}}</a>
        </li>
        <li class="page-item active" aria-current="page">
          <a class="page-link">
            {{pageNumber}}
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="page-item" v-if="hasNextPage">
          <a class="page-link" @click="$emit('next')">{{pageNumber + 1}}</a>
        </li>
        <li class="page-item" :class="{disabled: !hasNextPage}">
          <a class="page-link" @click="$emit('next')">Next Page</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pageNumber', 'hasNextPage'],
};
</script>

<style lang="scss" scoped>
.pagination-control {
  margin-top: 2rem;
  font-size: 0.8rem;
  padding: 2rem;
  text-align: center;
  nav {
    display: inline-block;
  }
}
</style>
