import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// svg icon
import "./icons";

// element
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 树维 UI
import SwUI from "sw-ui";
import "sw-ui/lib/theme-chalk/index.css";
Vue.use(SwUI);

// 全局 css
import "@/styles/index.scss";
import "@/styles/reset.scss";
import "@/styles/element-variables.scss";

// 全局 filters
import { formatBoolean, formatDate, formatNum } from "@/filters/filters.js";
Vue.filter("formatBoolean", formatBoolean);
Vue.filter("formatDate", formatDate);
Vue.filter("formatNum", formatNum);

// 生产提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
