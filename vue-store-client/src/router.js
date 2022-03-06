import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import Home from './views/Home.vue';
import { authController, productController } from './api';
import eventBus from './main';
import store from './store/store';
import config from './config';

const token = localStorage.getItem('token');

axios.defaults.baseURL = config.apiURL;
axios.defaults.headers.common['x-auth-token'] = token;

// axios.defaults.baseURL = 'http://localhost:3000';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/products/new',
      name: 'new-product',
      component: () => import('./views/ProductControl.vue'),
    },
    {
      path: '/products/:id/edit',
      name: 'edit-product',
      component: () => import('./views/ProductControl.vue'),
      beforeEnter(to, from, next) {
        const admin = store.getters.getAdmin;
        const productId = to.params.id;
        productController
          .getSingleProduct(productId)
          .then((result) => {
            if (result.data.author._id == admin._id) {
              return next();
            }
            // eslint-disable-next-line no-alert
            alert('Youre unauthorized');
            next('/me');
          })
          .catch(() => next('404'));
      },
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: () => import('./views/ProductDetails.vue'),
      beforeEnter(to, from, next) {
        productController
          .getSingleProduct(to.params.id)
          .then((response) => {
            if (response && response.status === 200) {
              store.dispatch('setSelectedProduct', response.data);
              return next();
            }
            next('404');
          })
          .catch(() => {
            next('404');
          });
      },
    },
    {
      path: '/me',
      name: 'my-profile',
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/me/edit',
      name: 'my-profile-edit',
      component: () => import('./views/ProfileControl.vue'),
    },
    {
      path: '/profile/:id',
      name: 'user-profile',
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/my-products',
      name: 'my-ads',
      component: () => import('./views/MyProducts.vue'),
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => import('./views/Chat.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/ProfileControl.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/ProfileControl.vue'),
    },
    {
      path: '/notifications',
      name: 'notification',
      component: () => import('./views/Notification.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/*',
      name: '404',
      component: () => import('./views/404.vue'),
    },
  ],
});

// router.beforeEach((to, from, next) => {

// }


// router.beforeEach((to, from, next) => {
//   next();
//   const token = localStorage.getItem('token');
//   if (token) {
//     axios.defaults.headers = {
//       'x-auth-token': token,
//     };
//     authController
//       .authenticateUser(token)
//       .then((resp) => {
//         store.dispatch('setAdmin', resp.data);
//         eventBus.isLoggedIn = true;
//         next();
//       })
//       .catch(({ response }) => {
//         next();
//       });
//   } else {
//     next();
//   }
// });

export default router;
