import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Student/Dashboard";
import Layout from "../components/Layout/adminLayout/Layout";
import LoginLayout from "../components/Layout/loginLayout/LoginLayout";

const routes = (isLoggedIn, TYPE) => [
  // {
  //   path: "/questionnaire/teacher",
  //   element:
  //     isLoggedIn && TYPE === "TEACHER" ? (
  //       <DashboardLayout />
  //     ) : isLoggedIn && TYPE === "ADMIN" ? (
  //       <Navigate to="/questionnaire/admin/dashboard" />
  //     ) : (
  //       <Navigate to="/questionnaire/login" />
  //     ),
  //   children: [
  //     { path: "/", element: <Dashboard /> },
  //     { path: "dashboard", element: <Dashboard /> },
  //     { path: "404", element: <NotFound /> },
  //     { path: "*", element: <Navigate to="/questionnaire/teacher/404" /> },
  //   ],
  // },
  {
    path: "/effect-covid-learner-survey",
    element: !isLoggedIn ? (
      <Layout />
    ) : TYPE == "TEACHER" ? (
      <Navigate to="/questionnaire/teacher/dashboard" />
    ) : (
      <Navigate to="/questionnaire/admin/dashboard" />
    ),
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "servey", element: <Dashboard /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/questionnaire/404" /> },
    ],
  },
  // {
  //   path: "/questionnaire/admin",
  //   element:
  //     isLoggedIn && TYPE === "ADMIN" ? (
  //       <AdminLayout />
  //     ) : isLoggedIn && TYPE === "TEACHER" ? (
  //       <Navigate to="/questionnaire/teacher/dashboard" />
  //     ) : (
  //       <Navigate to="/questionnaire/login-admin" />
  //     ),
  //   children: [
  //     { path: "/", element: <AdminDashboard /> },
  //     { path: "manage-teacher", element: <ManageTeacher /> },
  //     { path: "dashboard", element: <AdminDashboard /> },
  //     { path: "404", element: <NotFound /> },
  //     { path: "*", element: <Navigate to="/questionnaire/admin/404" /> },
  //   ],
  // },
];

export default routes;
