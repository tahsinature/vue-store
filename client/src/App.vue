<template>
  <div class="app">
    <notifications
      group="app-notification"
      position="bottom right"
      animation-type="velocity"
    ></notifications>
    <app-header></app-header>
    <app-cart></app-cart>
    <div class="content-field">
      <app-nav></app-nav>
      <keep-alive>
        <router-view
          @onNotify="notify($event)"
          @onNewPost="newPostNotification()"
          @onPostEdit="editPostNotification($event)"
        ></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import socket from "socket.io-client"
import HeaderVue from "./components/Header.vue"
import CartVue from "./components/Cart.vue"
import eventBus from "./main"
import SideNavVue from "./components/SideNav.vue"
import { productController, authController } from "./api"
import config from "./config"

const socketOn = socket(config.apiURL)

export default {
  methods: {
    newPostNotification() {
      this.$notify({
        group: "app-notification",
        title: "Successful",
        text: "Your post is live now. <br> Don't forget to reply clients messages.",
        duration: 5000,
        type: "success ",
      })
    },
    editPostNotification(title) {
      this.$notify({
        group: "app-notification",
        title,
        text: `Edit Post for <strong>${title}</strong> is successful. Have a good day.`,
        duration: 5000,
        type: "success ",
      })
    },
    notify(options) {
      this.$notify({
        group: "app-notification",
        title: options.title,
        text: options.text,
        duration: 5000,
        type: options.type,
      })
    },
    verifyAuthentication() {},
  },
  components: {
    "app-header": HeaderVue,
    "app-cart": CartVue,
    "app-nav": SideNavVue,
  },
  async created() {
    const result = await productController.getAllProducts()
    if (result.status === 200) {
      const { products } = result.data
      this.$store.dispatch("storeFetchedData", products)
      this.$emit("onProductLoad")
    }
    eventBus.$on("onNotify", $event => {
      this.notify($event)
    })
    if (this.$store.getters.allNotifications.length < 1 && this.$store.getters.isLoggedIn) {
      this.$store.dispatch("getNotificationsFromServer")
      this.$store.dispatch("loadCart")
    }

    this.verifyAuthentication()
  },
  mounted() {
    socketOn.addEventListener("newNotification", (notification, adminId, createdPackage) => {
      if (this.$store.getters.isLoggedIn) {
        if (adminId === this.$store.getters.getAdmin._id) {
          // eventBus.$emit(
          //   'onServerNotification',
          //   notification,
          //   createdPackage,
          // );
          this.$store.dispatch("storeLiveNotification", notification)
        }
      }
    })
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
p {
  margin: 0;
}
</style>

<style lang="scss">
@import "./assets/sass/main.scss";

.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.v--modal-overlay {
  display: flex;
}
</style>

<style lang="scss" scoped>
@import "./assets/sass/main.scss";
.content-field {
  @include respond(mf, tab-p) {
    display: grid;
    grid-template-columns: 5rem 1fr; //It depends on mini sidenav width.
    height: 100%;
  }
}
</style>
