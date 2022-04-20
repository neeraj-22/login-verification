import React, { Fragment } from "react";
import Header from "../CommonComps/Header";
import Footer from "../CommonComps/Footer";

const Homepage = () => {
  return (
    <Fragment>
      <Header />
      <div className="text-center">
        <h2>Login verification with features like :</h2>
        <h6> 1. Email verification using OTP</h6>
        <h6> 2. Profile Updation</h6>
        <h6> 3. Mail updates on registration, update.</h6>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Homepage;
