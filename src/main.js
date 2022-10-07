import { createApp } from "vue";
import Vuex from "vuex";
import "bootstrap";
import { defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import zh_TW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/style.scss";

defineRule("required", required);
defineRule("email", email);
defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "驗證碼輸入錯誤";
});

localize({ zh_TW });
configure({
  generateMessage: localize("zh_TW", {
    messages: {
      required: "請輸入 {field}",
    },
  }),
  validateOnInput: true,
});

// 進入路由前
router.beforeEach((to, from) => {
  // 進入主頁面前要判斷是否已登入
  return true;
});

const app = createApp(App);
app.use(Vuex);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
