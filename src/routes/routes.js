import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Student/Dashboard";
import Layout from "../components/Layout/adminLayout/Layout";
import LoginLayout from "../components/Layout/loginLayout/LoginLayout";

const routes = (isLoggedIn) => [
  {
    path: "/effect-covid-learner-survey",
    element: isLoggedIn ? (
      <Layout />
    ) : (
      <Navigate to="/effect-covid-learner-survey/login" />
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "survey", element: <Dashboard /> },
      { path: "404", element: <NotFound /> },
      {
        path: "*",
        element: <Navigate to="/effect-covid-learner-survey/404" />,
      },
    ],
  },
  {
    path: "/effect-covid-learner-survey",
    element: !isLoggedIn ? (
      <LoginLayout />
    ) : (
      <Navigate to="/effect-covid-learner-survey/survey" />
    ),
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "404", element: <NotFound /> },
      {
        path: "*",
        element: <Navigate to="/effect-covid-learner-survey/404" />,
      },
    ],
  },
];

export default routes;
