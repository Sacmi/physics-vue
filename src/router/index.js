import Vue from "vue";
import VueRouter from "vue-router";

import LoginView from "@/views/Login.vue";
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
    component: LoginView
  },
  {
    path: "/task/:id",
    name: "Task",
    component: () => import("@/views/Task.vue")
  },
  {
    path: "/offline",
    name: "Offline",
    component: () => import("@/views/Offline.vue")
  },
  {
    path: "/spam",
    name: "Spam",
    component: () => import("@/views/Spam.vue"),
    beforeEnter: (to, from, next) => {
      const { answer, taskId, topicId } = store.state.lecture;

      if (!answer || !taskId || !topicId) {
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
