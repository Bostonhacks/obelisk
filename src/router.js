import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user) {
      next();
    } else {
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

export default router;
