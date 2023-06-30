import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import UserTables from "views/admin/user";

// Auth Imports
import LogIn from "views/auth/LogIn";

// Icon Imports
import { MdHome, MdBarChart, MdPerson, MdLock } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard",
    code: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Login In",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <LogIn />,
  },
  {
    name: "使用者管理",
    layout: "/admin",
    icon: <MdPerson className="h-6 w-6" />,
    path: "admin",
    code: "admin",
    component: <UserTables />,
  },
  {
    name: "選單管理",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    code: "menu",
    path: "menu",
    component: <DataTables />,
  },
  {
    name: "設定",
    layout: "/admin",
    icon: <FiSettings className="h-6 w-6" />,
    code: "setting",
    path: "setting",
    component: <DataTables />,
  },
  {
    name: "選單權限",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "menu/permission",
    code: "menuPermission",
    component: <DataTables />,
  },
  {
    name: "選單規則",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "menu/rule",
    code: "menuRule",
    component: <DataTables />,
  },
  {
    name: "規則設定",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "rule",
    code: "rule",
    component: <DataTables />,
  },
  {
    name: "角色權限",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "role",
    code: "role",
    component: <DataTables />,
  },
];
export default routes;
