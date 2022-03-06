<template>
  <div class="comment-wrap">
    <div class="comment-block">
      <p class="mb-1">
        <router-link :to="'/profile/' + review.author._id" tag="strong">{{review.author.fullName}}</router-link>
      </p>
      <p class="comment-text">{{review.text}}</p>
      <div class="bottom-comment">
        <div class="comment-date">{{review.createdAt | moment("from", "now")}}</div>
        <ul class="comment-actions">
          <li class="remove" v-if="isAuthor" @click="removeReview">
            <i class="fas fa-trash-alt mr-1"></i>
            Remove ({{review.likers.length}} {{review.likers.length > 1 ? 'Likes' : 'Like'}})
          </li>
          <li class="like" v-else @click="likeReview">
            <i
              class="far mr-1"
              :class="{'fas fa-thumbs-up': isAlreadyLiked, 'fa-thumbs-up': !isAlreadyLiked, 'text-primary': isAlreadyLiked}"
            ></i>
            Like
            <span>({{review.likers.length}})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const eventBus = require('../main');

export default {
  props: ['review'],
  computed: {
    isAuthor() {
      const admin = this.$store.getters.getAdmin;
      if (admin) return admin._id === this.review.author._id;
      return false;
    },
    isAlreadyLiked() {
      if (this.$store.getters.isLoggedIn) {
        return this.review.likers.includes(this.$store.getters.getAdmin._id);
      }
      return false;
    },
  },
  methods: {
    removeReview() {
      this.$emit('onRemove', this.review._id);
    },
    likeReview() {
      this.$emit('onLike', this.review._id);
    },
  },
};
</script>


<style lang="scss" scoped>
$ptsans: "PT Sans", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
$placeholder: #ced2db;
$text-color: #555f77;
$links: #0095ff;

p {
  line-height: 1.3;
  text-align: left;
}

.comment-wrap {
  display: table;
  width: 100%;
  &:not(:first-of-type) {
    padding-top: 1rem;
  }
  &:not(:last-of-type) {
    padding-bottom: 1rem;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-image: linear-gradient(
      to right,
      #cccccc1f 0%,
      #bdbdbd93 50%,
      #cccccc1f 100%
    );
    border-image-slice: 1;
  }
}

.comment-block {
  display: table-cell;
  vertical-align: top;
  strong {
    cursor: pointer;
    &:hover {
      color: $links;
    }
  }
  textarea {
    width: 100%;
    resize: none;
  }
}

.comment-text {
  margin-bottom: 0.6rem;
}

.bottom-comment {
  color: #acb4c2;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// .comment-date {
// }

.comment-actions {
  display: flex;
  margin-right: 2rem;
  margin-bottom: 0;
  li {
    display: inline;
    margin: -2px;
    cursor: pointer;
    i {
      transition: all 0.3s;
    }

    // &.complain {
    //   padding-right: 1rem;
    //   border-right: 1px solid #e1e5eb;
    // }

    // &.reply {
    //   padding-left: 1rem;
    // }

    &.like:hover {
      :not(span) {
        color: $links;
      }
    }
    &.remove:hover {
      color: red;
    }
  }
}
</style>
