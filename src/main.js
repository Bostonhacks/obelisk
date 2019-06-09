import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";

Vue.config.productionTip = false;

var app = null;
firebase.auth().onAuthStateChanged(async () => {
  if (!app) {
    await store.dispatch("setUser");
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
