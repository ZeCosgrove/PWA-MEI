import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Users from "./components/users/Users";
import Login from "./components/login/Login";
import MainLayout from "./layouts/Main";
import Errors from "./views/Errors";

const App = () => {
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
          <Route path="*" element={<Errors />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
