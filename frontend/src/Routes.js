import React from "react";
import { BrowserRouter, Routes as RoutesAlt, Route } from "react-router-dom";

//Importing Components
import Homepage from "./components/Homepage/Homepage";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile"
import VerifyEmail from "./components/VerifyEmail/VerifyEmail"
import Signout from "./components/Signout/Signout";
import UpdateProfile from "./components/Profile/UpdateProfile";

const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesAlt>
        <Route path='/' exact element={<Homepage/>} />
        <Route path='/signin' exact element={<Signin/>} />
        <Route path='/signup' exact element={<Signup/>} />
        <Route path='/signout' exact element={<Signout/>} />
        <Route path='/profile' exact element={<Profile/>} />
        <Route path='/update' exact element={<UpdateProfile/>} />
        <Route path='/verifyemail' exact element={<VerifyEmail/>} />
      </RoutesAlt>
    </BrowserRouter>
  );
};

export default Routes;
