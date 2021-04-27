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
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: () => import('@/views/YourFeed.vue')
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: () => import('@/views/TagFeed.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: () => import('@/views/CreateArticle.vue')
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: () => import('@/views/Article.vue')
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: () => import('@/views/EditArticle.vue')
  },
  {
    path: '/articles/:slug/favorite',
    name: 'favoriteArticle',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/profile/:slug',
    name: 'userProfile',
    component: () => import('@/views/UserProfile.vue')
  },
  {
    path: '/profile/:slug/favorites',
    name: 'userProfileFavorites',
    component: () => import('@/views/UserProfile.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
