import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../CommonComps/Footer";
import Header from "../CommonComps/Header";
import { useDispatch, useSelector } from "react-redux";
import { initOTPandSaveToDB } from "../../actions/userAction";

const Profile = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user)
  const { loading, otpGenerated, emailVerified } = useSelector(state => state.profile)

  const [message, setMessage] = useState("");
  
  const handleInitOTP = (e) => {
    e.preventDefault();
    dispatch(initOTPandSaveToDB());
  }

  useEffect(() => {
    if(loading){
      setMessage(`Generating OTP..`)
    }
    if(otpGenerated){
      setMessage(`Generated OTP was sent to ${user.email}.`);
    }
  }, [loading, otpGenerated, user.email])
 
  return (
    <Fragment>
      <Header sInActive={1} />
      <div className="formContainer">
        <h3>
          <span>{user.name ? `${user.name}'s ` : "Null"}</span>Profile
        </h3> 
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder={user.name ? user.name : "-/-"}
            value={user.name ? user.name : ""}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Email
          </label>
          {user.isEmailVerified ? <span
              style={
                {
                outline: "none",
                backgroundColor: "transparent",
                border: "none",
                color: "black",
                opacity:"0.7",
              }
            }
            >
              {" "}
              <i>(verified)</i>
            </span> : <button
              style={
                {
                outline: "none",
                backgroundColor: "transparent",
                border: "none",
                color: "royalblue",
                textDecoration: "underline",
              }
            }
              onClick={handleInitOTP}
            >
              {" "}
              Verify
            </button>}
            
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder={user.email ? user.email : "-/-" }
            disabled
          />
        </div>
          <Link to={`/update`}><button className="btn btn-dark mt-3 m-2">Edit Profile</button></Link>
        <p style={otpGenerated && !emailVerified ? {display:"inline"} : {display:"none"}}>{JSON.stringify(message)}<span style={otpGenerated && !emailVerified ? {display:"inline"} : {display:"none"}}><Link to={`/verifyemail`}>Verify OTP here</Link></span></p>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Profile;
