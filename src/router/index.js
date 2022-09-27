import { createRouter, createWebHashHistory } from 'vue-router';
// import Layout from '@/layout/Index.vue';


const routes = [
  {
    path: '/',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router
