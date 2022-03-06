<template>
  <div class="modal-categories">
    <div class="header">
      <i class="fas fa-window-close" @click="$emit('closeContactList')"></i>
      <div class="display">
        <transition name="fade">
          <input
            key="1"
            type="text"
            placeholder="Seach your contacts"
            v-if="searchMode"
            v-model="searchText"
          />
          <p key="2" class="title" v-else>Contacts</p>
        </transition>
      </div>
      <i class="fas fa-search" @click="searchMode = !searchMode" v-if="!searchText"></i>
      <i
        class="fas fa-times-circle text-warning"
        @click="searchText = ''; searchMode = false"
        v-else
      ></i>
    </div>
    <div class="body">
      <div class="contact-tile" v-for="contact in filterdResult" :key="contact._id">
        <img v-lazy="contact.profilePhoto.url" alt />
        <div class="details">
          <div class="left">
            <router-link :to="'/profile/' + contact._id">
              <p class="name" @click="$emit('closeContactList')">{{contact.fullName}}</p>
            </router-link>

            <p
              class="prod-holder text-muted"
            >{{contact.products.length}} Active {{contact.products.length > 1 ? 'Ads' : 'Ad' }}</p>
          </div>
          <div class="right">
            <i class="far fa-comment" @click="$emit('SendMessageFromContactModel', contact)"></i>
            <i
              class="fas fa-circle mr-1"
              :style="{color: contact.isOnline ? 'green' : '#820404a3'}"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable comma-dangle */

export default {
  props: ['contacts'],
  data() {
    return {
      searchMode: false,
      searchText: '',
      filterdResult: undefined
    };
  },
  created() {
    this.filterdResult = this.contacts;
  },
  watch: {
    searchText() {
      this.filterdResult = this.contacts.filter(ele => ele.fullName.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/main";
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #17a2b8;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  i {
    padding: 1rem;
    transition: 0.3s all;
    cursor: pointer;
    font-size: 1.5rem;
    &:hover {
      color: rgb(222, 255, 160);
    }
  }
}
.display {
  text-align: center;
  flex-grow: 1;
  input {
    @include respond(df, mbl) {
      font-size: 0.7rem;
    }
    border: 3px solid #058ea3;
    border-radius: 20px;
    padding: 0.3rem 1rem;
    width: 50%;
    transition: all 0.3s;
    &:focus {
      width: 90%;
      outline: none;
    }
  }
}
.body {
  max-height: 80vh;
  overflow-y: scroll;
}
.contact-tile {
  display: flex;
  align-items: center;
  transition: all 0.3s;
  &:not(:last-of-type) {
    border-bottom: 1px solid #17a3b831;
  }
  &:hover {
    background: #17a3b831;
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    // border-left: 5px solid #058ea3;
  }
  .details {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding: 0 1rem;
    .left {
      .name {
        font-weight: bold;
      }
      .prod-holder {
        font-size: 0.8rem;
      }
    }
    .right {
      display: flex;
      align-items: center;
      i {
        &:first-of-type {
          font-size: 2rem;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: #17a2b8;
          }
        }
        &:last-of-type {
          margin-left: 1rem;
        }
      }
    }
  }
}

.fade-enter {
  opacity: 0;
}
// .fade-enter-active {
//   // transition: all 0.3s;
// }
// .fade-leave {
// }
.fade-leave-active {
  opacity: 0;
  transition: all 0.1s;
}
</style>
