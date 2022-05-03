import Vue from "vue"
import VueResource from "vue-resource"
// import firebase from 'firebase';
// import firebase from 'firebase/app';
import firebase from "firebase/app"
// import 'firebase/<PACKAGE>';
import VeeValidate from "vee-validate"
import VueFlashMessage from "vue-flash-message"
import Notifications from "vue-notification"
import velocity from "velocity-animate"
import VModal from "vue-js-modal"
import Loading from "vue-loading-overlay"
import VueLazyload from "vue-lazyload"
import VueChatScroll from "vue-chat-scroll"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"
import "vue-loading-overlay/dist/vue-loading.css"
import { authController } from "./api"
import MarqueeText from "vue-marquee-text-component"

Vue.prototype.$http = require("axios")

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueFlashMessage)
Vue.use(Notifications, { velocity })
Vue.use(VeeValidate)
Vue.use(Loading)
Vue.use(VueLazyload, {
  loading: require("./assets/gif/loading.gif"),
  error: require("./assets/images/failed-to-load.png"),
  attempt: 3,
})
Vue.use(VueChatScroll)
// Vue.use(MarqueeText);
Vue.component("marquee-text", MarqueeText)
Vue.use(VModal, { dynamic: true })
Vue.use(require("vue-moment"))

export default new Vue({
  data: {
    isLoggedIn: false,
    profile: {
      role: undefined,
    },
  },
})

Vue.component("app-loading", Loading)

function renderVue() {
  new Vue({
    router,
    store,
    render: h => h(App),
    created() {
      const config = {
        apiKey: "AIzaSyAc7Syc0NYwXDb25d1-OSbCXqSkuWIfG5M",
        authDomain: "vue-store-tahsin.firebaseapp.com",
        databaseURL: "https://vue-store-tahsin.firebaseio.com",
        projectId: "vue-store-tahsin",
        storageBucket: "gs://vue-store-tahsin.appspot.com/",
        messagingSenderId: "909938365359",
      }
      firebase.initializeApp(config)
    },
  }).$mount("#app")
}

const token = localStorage.getItem("token")
authController
  .authenticateUser(token)
  .then(({ data, status }) => {
    if (status === 200) {
      store.dispatch("makeIsLoggedInTrue")
      store.dispatch("setAdmin", data)
      renderVue()
    } else {
      renderVue()
    }
  })
  .catch(() => {
    renderVue()
  })
