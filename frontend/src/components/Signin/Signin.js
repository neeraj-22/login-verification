import React, { Fragment, useState, useEffect } from "react";
import Footer from "../CommonComps/Footer";
import Header from "../CommonComps/Header";
import "./Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const Signin = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {error , isAuthenticated} = useSelector(state => state.user)

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(loginEmail, loginPassword));
  };


  useEffect(() => {
    if(isAuthenticated){
      navigate(`/profile`)
    }

    if(error){
      dispatch(clearErrors())
    }
  }, [isAuthenticated, navigate, dispatch, error])
  return (
    <Fragment>
      <Header/>
      <div className="formContainer">
        <h3>Signin to your account</h3>
        <form onSubmit={loginSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <input type="submit" value={"login"} className="btn btn-dark mt-3"/>
        </form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Signin;
