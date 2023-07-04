import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Users from "./components/users/Users";
import Login from "./components/login/Login";
import MainLayout from "./layouts/Main";
import Errors from "./views/Errors";
import UserEdit from "./components/user-edit/UserEdit";
import ComponentsOverview from "./views/ComponentsOverview";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "./components/categories/Categories";
import CategoriesEdit from "./components/categories/CategoriesEdit";
import CategoriesAdd from "./components/categories/CategoriesAdd";
import Products from "./components/products/Products";
import Shops from "./components/shops/Shops";
import ShopsAdd from "./components/shops/ShopsAdd";
import ShopsEdit from "./components/shops/ShopsEdit";
import ShopsInner from "./components/shops/ShopsInner";
import ShopsInnerAdd from "./components/shops/ShopsInnerAdd";

const App = () => {
  axios.interceptors.request.use(
    function(config) {
      const token = `Bearer ${localStorage.getItem("_auth")}`;

      config.headers.Authorization = token;
      console.log(config.headers.Authorization);

      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (error.response.status === 403) {
        window.location.href = "/login";
      }
      console.log(error);
      toast.error(error.response.data.message);
      return Promise.reject(error);
    }
  );

  return (
    <AuthProvider authType={"localstorage"} authName={"_auth"}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainLayout>
                <Users /> {/* Replace with Dashboard */}
              </MainLayout>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/users"
            element={
              <MainLayout>
                <Users />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/users/:id"
            element={
              <MainLayout>
                <UserEdit />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/categories"
            element={
              <MainLayout>
                <Categories />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/categories/:id"
            element={
              <MainLayout>
                <CategoriesEdit />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/categories/add"
            element={
              <MainLayout>
                <CategoriesAdd />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/products/:id"
            element={
              <MainLayout>
                <CategoriesEdit />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/products/add"
            element={
              <MainLayout>
                <CategoriesAdd />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/shops"
            element={
              <MainLayout>
                <Shops />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/shops/add"
            element={
              <MainLayout>
                <ShopsAdd />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/shops/:id"
            element={
              <MainLayout>
                <ShopsEdit />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/shops/inner/:id"
            element={
              <MainLayout>
                <ShopsInner />
              </MainLayout>
            }
          />
          <Route
            exact
            path="/shops/inner/add/:id"
            element={
              <MainLayout>
                <ShopsInnerAdd />
              </MainLayout>
            }
          />
          <Route path="/components-overview" element={<ComponentsOverview />} />
          <Route path="*" element={<Errors />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </AuthProvider>
  );
};

export default App;
