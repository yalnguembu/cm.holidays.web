import { createRouter, createWebHistory } from "vue-router";
const MainWrapper = () => import("../components/MainWrapper.vue");
const AuthenticationWrapper = () =>
  import("../components/AuthenticationWrapper.vue");
const HomePage = () => import("../views/HomePage.vue");
const SingIn = () => import("../views/SingIn.vue");
const HolidayDetails = () => import("../views/HolidayDetails.vue");
const HolidaysList = () => import("../views/HolidaysList.vue");
const PasswordForgot = () => import("../views/PasswordForgot.vue");
const ResetPassword = () => import("../views/ResetPassword.vue");
const VerifyMail = () => import("../views/VerifyMail.vue");


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
        component: HolidaysList,
      },
      {
        name: "details",
        path: "list/:id",
        component: HolidayDetails,
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
        component: SingIn,
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