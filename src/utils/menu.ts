export interface NavaBarItem {
  label: string;
  path: string;
  name?: string;
}

export const adminNavBarItems: NavaBarItem[] = [
  {
    label: "Services",
    path: "/admin/services",
    name: "service_list",
  },
  {
    label: "Posts",
    path: "/admin/posts",
    name: "posts_list",
  },
  {
    label: "Users",
    path: "/admin/users",
    name: "users_list",
  },
  {
    label: "Roles",
    path: "/admin/roles",
    name: "roles_list",
  },
];

export const humanResourceNavBarItems: NavaBarItem[] = [
  {
    label: "Holiday Requests",
    path: "/human-resource/holiday-requests",
    name: "human_resources_holidays_request_list",
  },
  {
    label: "Employees",
    path: "/human-resource/employees",
    name: "employees_list",
  },
  {
    name: "holiday_types_list",
    path: "/human-resource/holiday_types",
    label: "Holiday Type",
  },
];

export const clientNavBarItems = [
  {
    label: "Holiday Requests",
    path: "/holiday-requests",
    name: "holiday_requests_list",
  },
]
