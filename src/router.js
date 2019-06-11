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
      component: () => import("./views/Home.vue"),
      meta: {
        companyCheck: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/mailgun",
      name: "mailgun",
      component: () => import("./views/Mailgun.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user) {
      if (to.name == "profile") {
        next();
      } else {
        if (user.companyName) {
          next();
        } else {
          next({
            name: "profile"
          });
        }
      }
    } else {
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.companyCheck)) {
    let user = store.state.user;
    if (user) {
      if (user.companyName) {
        next();
      } else {
        next({
          name: "profile"
        });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
