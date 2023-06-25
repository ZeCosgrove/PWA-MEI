import React from "react";
import { Navigate } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Users from "./components/users/Users";
import Login from "./components/login/Login";
import MainLayout from "./layouts/Main";

export default [
  {
    path: "/",
    exact: true,
    layout: MainLayout,
    element: () => <Navigate to="/login" />
  },
  {
    path: "/blog-overview",
    layout: MainLayout,
    element: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: MainLayout,
    element: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: MainLayout,
    element: AddNewPost
  },
  {
    path: "/errors",
    layout: MainLayout,
    element: Errors
  },
  {
    path: "/components-overview",
    layout: MainLayout,
    element: ComponentsOverview
  },
  {
    path: "/tables",
    layout: MainLayout,
    element: Tables
  },
  {
    path: "/blog-posts",
    layout: MainLayout,
    element: BlogPosts
  },

  // -----------------------------------------------

  {
    path: "/login",
    layout: DefaultLayout,
    element: Login
  },
  {
    path: "/users",
    layout: MainLayout,
    element: Users
  }
];
