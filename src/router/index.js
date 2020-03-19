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
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/task/:id",
    name: "Task",
    component: () => import("@/views/Task.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const { verificationCookie, authCookie } = store.state;

  if ((!verificationCookie || !authCookie) && to.name != "Login")
    next({ name: "Login" });
  else next();
});

export default router;
