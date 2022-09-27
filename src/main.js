import { createApp } from 'vue';
import Vuex from 'vuex';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/style.scss';

// 進入路由前
router.beforeEach((to, from) => {
  // 進入主頁面前要判斷是否已登入
  return true;
})

// 進入路由且非同步載入完
router.beforeResolve((to, from) => {
  return true;
})

const app = createApp(App);
app.use(Vuex);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
