import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalFeed from '../views/GlobalFeed.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: GlobalFeed
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
