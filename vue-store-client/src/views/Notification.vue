<template>
  <div class="app-notifications">
    <div class="notifications-container container">
      <div class="header">
        <h3 class="title">{{mode === 'all' ? 'All' : 'Unread'}} Notifications</h3>
        <div class="sub-titles">
          <div class="sub-title" @click="mode = 'all'" :class="{active: mode === 'all'}">All</div>
          <div
            class="sub-title"
            @click="mode = 'unread'"
            :class="{active: mode === 'unread'}"
          >Unread</div>
        </div>
      </div>
      <div
        class="clear-notification"
        v-if="mode === 'all' && allNotifications.length > 0"
        @click="clearAllNotifications"
      >Clear all notifications</div>
      <div
        class="clear-notification"
        v-if="mode === 'unread' && unreadNotifications.length > 0"
        @click="markAllAsRead"
      >Mark all as read</div>

      <div class="notification-tiles mt-5" v-if="mode === 'all'">
        <div
          class="notification-tile"
          v-for="notification in allNotifications"
          :key="notification._id"
          @click="markOneAsRead(notification._id); gotoLink(notification.link)"
        >
          <img v-lazy="notification.user.profilePhoto.url">
          <div class="right">
            <p>{{notification.text}}</p>
          </div>
          <div class="time">
            <p>{{notification.date | moment("from", "now")}}</p>
          </div>
        </div>
        <div v-if="allNotifications.length < 1">No Notifications</div>
      </div>
      <div class="notification-tiles mt-5" v-if="mode === 'unread'">
        <div
          class="notification-tile"
          v-for="notification in unreadNotifications"
          :key="notification._id"
          @click="markOneAsRead(notification._id); gotoLink(notification.link)"
        >
          <img v-lazy="notification.user.profilePhoto.url">
          <div class="right">
            <p>{{notification.text}}</p>
          </div>
          <div class="time">
            <p>{{notification.date | moment("from", "now")}}</p>
          </div>
        </div>
        <div v-if="unreadNotifications.length < 1">No Unread Notifications</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import eventBus from '../main';
import store from '../store/store';

export default {
  data() {
    return {
      mode: 'unread',
    };
  },
  methods: {
    markOneAsRead(id) {
      this.$store.dispatch('markAsRead', { notificationIds: [id] });
    },
    markAllAsRead() {
      const payload = { notificationIds: [] };
      this.unreadNotifications.forEach((x) => {
        payload.notificationIds.push(x._id);
      });
      this.$store.dispatch('markAsRead', payload);
    },
    clearAllNotifications() {
      const payload = { notificationIds: [] };
      this.allNotifications.forEach((x) => {
        payload.notificationIds.push(x._id);
      });
      this.$store.dispatch('clearAllNotifications', payload);
    },
    gotoLink(link) {
      this.$router.push(link);
    },
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isLoggedIn) {
      next('/login');
      return eventBus.$emit('onNotify', {
        title: 'Please login first',
        text: "You've to login first to see your notifications.",
        type: 'error',
      });
    }
    next();
  },
  computed: {
    ...mapGetters(['allNotifications', 'unreadNotifications']),
  },
  created() {
    // if (this.allNotifications.length < 1) {
    //   this.$store.dispatch('getNotificationsFromServer');
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
$tile-width-sm: 20rem;
$tile-width-md: 30rem;
$tile-width-lg: 40rem;

.app-notifications {
  background: rgb(37, 51, 61);
  min-height: calc(100vh - 4rem);
}
.notifications-container {
  color: #fff;
  text-align: center;
}
.header {
  margin-top: 2rem;
  display: inline-block;
  background: rgba(255, 255, 255, 0.192);
  text-align: center;
  border-radius: 10px;
  transition: width 0.3s;
  width: $tile-width-lg;
  @include respond(df, tab-l) {
    width: $tile-width-md;
  }
  @include respond(df, mbl) {
    width: $tile-width-sm;
  }
  overflow: hidden;
  .title {
    border-bottom: 1px solid rgba(255, 255, 255, 0.562);
    padding: 1rem;
    margin: 0;
  }
  .sub-titles {
    display: flex;
    .sub-title {
      width: 50%;
      padding: 0.5rem;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.747);
      &:hover {
        background: rgba(255, 255, 255, 0.377);
      }
      &.active {
        background: rgba(37, 51, 61, 0.5);
        box-shadow: 0 0 38px 0px rgba(255, 255, 255, 0.2) inset;
        cursor: default;
        color: #fff;
      }
      &:first-of-type {
        border-right: 1px solid rgba(255, 255, 255, 0.562);
      }
    }
  }
}
.clear-notification {
  width: $tile-width-lg;
  @include respond(df, tab-l) {
    width: $tile-width-md;
  }
  @include respond(df, mbl) {
    width: $tile-width-sm;
  }
  background: rgba(255, 255, 255, 0.192);
  border-radius: 10px;
  margin: auto;
  margin-top: 1rem;
  padding: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.377);
  }
}
.notification-tiles {
  padding-bottom: 2rem;
}
.notification-tile {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  width: $tile-width-lg;
  min-height: 95px;
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
  @include respond(df, tab-l) {
    width: $tile-width-md;
  }
  @include respond(df, mbl) {
    width: $tile-width-sm;
  }
  background: rgba(228, 228, 228, 0.884);
  &:hover {
    background: rgb(255, 255, 255);
    box-shadow: 0 0 2rem 1rem rgba($color: #fff, $alpha: 0.1);
  }
  cursor: pointer;
  color: #000;
  padding: 1rem;
  border-radius: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.7rem;
    border: 3px solid rgba(255, 255, 255, 0.329);
    @include respond(df, mbl) {
      display: none;
    }
  }
  .right {
    font-size: 0.9rem;
    border-right: 1px solid rgba(0, 0, 0, 0.288);
    text-align: left;
    padding-right: 1rem;
    flex-grow: 1;
    flex-shrink: 99999;
  }
  .time {
    font-size: 0.6rem;
    color: rgb(112, 112, 112);
    width: 70px;
  }
}
</style>
