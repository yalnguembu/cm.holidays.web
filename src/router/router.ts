import { createRouter, createWebHistory } from "vue-router";
import PageLayout from "@/components/MainWrapper.vue";

export const routes = [
  {
    path: "/",
    component: PageLayout,
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("@/views/HomePage.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        name: "list",
        path: "list",
        component: () => import("@/views/HolidaysList.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        name: "login",
        path: "login",
        component: () => import("@/views/SingIn.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/:patchMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/human-ressources",
        name: "HumanRessources",
        component: () => import("@/views/HR/HomePage.vue"),
        meta: {
          isPublic: false,
        },
      },
      {
        path: "/human-ressources/holiday-requests",
        name: "HRHolidaysList",
        component: () => import("@/views/HR/HolidaysList.vue"),
        meta: {
          isPublic: false,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
