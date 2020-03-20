import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/signin",
    name: "Login",
    component: () => import(/* webpackChunkName: "base" */ "@/views/Login.vue")
  },
  {
    path: "/task/:id",
    name: "Task",
    component: () => import("@/views/Task.vue")
  },
  {
    path: "/offline",
    name: "Offline",
    component: () =>
      import(/* webpackChunkName: "base" */ "@/views/Offline.vue")
  },
  {
    path: "/spam",
    name: "Spam",
    component: () => import("@/views/Spam.vue"),
    beforeEnter: (to, from, next) => {
      const { answer, sessionCookie, taskId, topicId } = store.state.lecture;

      if (!answer || !sessionCookie || !taskId || !topicId) {
        next({ name: "Home" });
      } else next();
    }
  },
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: (to, from, next) => {
      store.commit("setSessionData", {
        authCookie: null,
        verificationCookie: null,
        email: null
      });

      localStorage.setItem("autoSignIn", false);
      next({ name: "Login" });
    }
  }
];

const router = new VueRouter({
  routes
});

/* TODO: переделать эту ссанину */
router.beforeEach((to, from, next) => {
  const networkStatus = navigator.onLine;
  const { name } = to;

  if (!networkStatus && name != "Offline") {
    next({ name: "Offline" });
  }

  const { verificationCookie, authCookie } = store.state.session;

  if (
    (!verificationCookie || !authCookie) &&
    name != "Login" &&
    name != "Offline"
  )
    next({ name: "Login" });
  else next();
});

export default router;
