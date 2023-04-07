import { createRouter, createWebHistory } from "vue-router";
import MainWrapper from "../components/MainWrapper.vue";
import HomePage from "../views/HomePage.vue";

export const routes = [
  {
    path: "/",
    component: MainWrapper,
    children: [
      {
        name: "Home",
        path: "",
        component: HomePage,
      },
      {
        name: "list",
        path: "list",
        component: () => import("../views/holiday/HolidaysList.vue"),
      },
      {
        name: "details",
        path: "list/:id",
        component: () => import("../views/holiday/HolidayDetails.vue"),
      },
      {
        path: "/:patchMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("../components/AuthenticationWrapper.vue"),
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("../views/auth/SingIn.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
