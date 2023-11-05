import { createRouter, createWebHistory } from "vue-router";
import ThePageLayout from "@/components/ThePageLayout.vue";

export const routes = [
  {
    path: "/",
    component: ThePageLayout,
    children: [
      {
        name: "Home",
        path: "",
        component: () => import("@/views/DashBoard.vue"),
        meta: {
          requiredRolesList: ["ADMIN", "EMPLOYEE", "HUMAN_RESOURCE"],
          isPublic: false,
        },
      },
      {
        name: "holiday_requests_list",
        path: "holiday-requests",
        component: () => import("@/views/HolidayRequestsList.vue"),
        meta: {
          requiredRolesList: ["ADMIN", "EMPLOYEE", "HUMAN_RESOURCE"],
          isPublic: false,
        },
      },
      {
        name: "human_resources",
        path: "human-resource",
        meta: {
          isPublic: false,
          requiredRolesList: ["ADMIN", "HUMAN_RESOURCE"],
        },
        children: [
          {
            name: "human_resources_holidays_request_list",
            path: "holiday-requests",
            component: () =>
                import("@/views/humanResources/HolidayRequestsList.vue"),
          },
          {
            name: "employees_list",
            path: "employees",
            component: () => import("@/views/humanResources/EmployeesList.vue"),
          },
          {
            name: "holiday_types_list",
            path: "holiday_types",
            component: () => import("@/views/humanResources/HolidayTypesList.vue"),
          },
        ],
      },
      {
        name: "admin",
        path: "admin",
        meta: {
          requiredRolesList: ["ADMIN"],
          isPublic: false,
        },
        children: [
          {
            name: "service_list",
            path: "services",
            component: () => import("@/views/admin/ServicesList.vue"),
          },
          {
            name: "posts_list",
            path: "posts",
            component: () => import("@/views/admin/PostsList.vue"),
          },
          {
            name: "users_list",
            path: "users",
            component: () => import("@/views/admin/UsersList.vue"),
          },
          {
            name: "roles_list",
            path: "roles",
            component: () => import("@/views/admin/RolesList.vue"),
          },
        ],
      },
      {
        name: "login",
        path: "auth/sign-in",
        component: () => import("@/views/authentication/SingIn.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        name: "NotFound",
        path: "/:patchMatch(.*)*",
        component: () => import("@/views/NotFound.vue"),
        meta: {
          isPublic: true,
          requiredRolesList: [],
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
