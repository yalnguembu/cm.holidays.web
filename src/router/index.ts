import { createRouter, createWebHistory } from "vue-router";
import MainWrapper from "../components/MainWrapper.vue";
import HomePage from "../views/HomePage.vue";
const PasswordForgot = () => import("../views/auth/PasswordForgot.vue");
const ResetPassword = () => import("../views/auth/ResetPassword.vue");
const VerifyMail = () => import("../views/auth/VerifyMail.vue");

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
      {
        name: "forgot",
        path: "forgot",
        component: PasswordForgot,
      },
      {
        name: "verify-mail",
        path: "verify-mail",
        component: VerifyMail,
      },
      {
        name: "reset-password",
        path: "reset-password",
        component: ResetPassword,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
