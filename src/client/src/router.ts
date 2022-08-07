import { createRouter, createWebHistory } from 'vue-router';
import RandomizeView from './views/RandomizeView.vue';

const routes = [{ path: '/', name: 'Random', component: RandomizeView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
