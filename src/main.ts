import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

import './../node_modules/bulma/css/bulma.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

window.addEventListener('message', (e) => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    console.clear()
  }
})
