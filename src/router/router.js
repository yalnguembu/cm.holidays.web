import { createRouter, createWebHistory } from "vue-router";
const MainWrapper = import("../components/MainWrapper.vue");
const AuthenticationWrapper = import("../components/AuthenticationWrapper.vue");
const Home = import("../views/HomePage.vue");
const Login = import("../views/SingIn.vue");
const Details = import("../views/HolidayDetails.vue");
const List = import("../views/HolidaysList.vue");
const Forgot = import("../views/PasswordForgot.vue");
const RessetPassword = import("../views/ResetPassword.vue");
const VerifyMail = import("../views/VerifyMail.vue");


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
