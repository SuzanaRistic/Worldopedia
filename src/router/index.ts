import { createRouter, createWebHistory } from 'vue-router';
import Worldopedia from '../views/TheWorldopedia.vue';
import Favorite from '../views/Favorite.vue';

const routes = [
  {
    path: '/',
    name: 'worldopedia',
    component: Worldopedia,
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
