import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
  },
];

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/views/Policy'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About'),
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

function createRouter() {
  return new VueRouter({
    // mode: 'hash',
    routes: [...constantRoutes, ...routes],
  });
}

const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

export default router;
