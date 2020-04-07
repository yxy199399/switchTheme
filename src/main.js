import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.scss";
import "./plugin/element.js";
import Theme from "./plugin/theme";

Vue.config.productionTip = false;
Vue.prototype.Theme = Theme;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
