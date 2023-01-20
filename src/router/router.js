import MainWrapper from "../components/MainWrapper.vue";
import AuthenticationWrapper from "../components/AuthenticationWrapper.vue";
import Home from "../views/HomePage.vue";
import Login from "../views/SingIn.vue";
import Details from "../views/HolidayDetails.vue";
import List from "../views/HolidaysList.vue";
import Forgot from "../views/PasswordForgot.vue";
import RessetPassword from "../views/ResetPassword.vue";
import VerifyMail from "../views/VerifyMail.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: MainWrapper,
    children: [
      {
        name: "Home",
        path: "/",
        component: Home,
      },
      {
        name: "list",
        path: "list",
        component: List,
      },
      {
        name: "details",
        path: "list/:id",
        component: Details,
      },
    ],
  },
  {
    path: "/",
    component: AuthenticationWrapper,
    children: [
      {
        name: "login",
        path: "login",
        component: Login,
      },
      {
        name: "forgot",
        path: "forgot",
        component: Forgot,
      },
      {
        name: "verify-mail",
        path: "verify-mail",
        component: VerifyMail,
      },
      {
        name: "reset-password",
        path: "reset-password",
        component: RessetPassword,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;