import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const bodyParameters = {
      email: email,
      password: password
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        bodyParameters
      );

      signIn({
        token: res.data.token,
        expiresIn: res.data.expiresIn / 60,
        tokenType: "Bearer",
        authState: {
          email: res.data.email,
          id: res.data._id,
          name: res.data.name
        }
      });

      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <img src={require("../../images/logo.png")} className="logo" alt="logo" />
      <div>
        <div className="form-group row">
          <label htmlFor="exampleInputEmail1">Endereço de Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="exemplo@exemplo.com"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputPassword1">Palavra-Passe</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="*******"
            onChange={e => setPassword(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            Todos os seus dados são confidenciais.
          </small>
        </div>
        <button
          type="button"
          className="row btn btn-primary float-end"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
