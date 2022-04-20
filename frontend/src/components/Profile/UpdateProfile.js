import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, updateUserDetails } from "../../actions/userAction";
import Footer from "../CommonComps/Footer";
import Header from "../CommonComps/Header";

const UpdateProfile = () => {

  const dispatch = useDispatch();

  const { user, error } = useSelector( (state) => state.user ) 
  const { loading, isUpdated } = useSelector( (state) => state.profile ) 
  
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState("");

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(name));
  }

  useEffect(() => {
    if(error){
      dispatch(clearErrors());
    }

    if(loading){
      setMessage(
        `Hang in there while we update your detail(s)..`
      )
    }

    if(isUpdated){
      setMessage(
        `Profile Updated Successfully. Kindly signin again for changes to reflect.`)  
    }

  }, [dispatch, error, isUpdated, loading])
  return (
    <Fragment>
      <Header sInActive={1} />
      <div className="formContainer">
        <form onSubmit={handleProfileUpdate}>
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
              placeholder={user.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        <button className="btn btn-dark mt-3 m-2" type="submit">
          Save Changes
        </button>
        <Link to={`/profile`}>
          <button className="btn btn-dark mt-2 ml-5">Back to Profile</button>
        </Link>
        <p>{JSON.stringify(name)}</p>
        <p>{JSON.stringify(message)}</p>
        </form>
      </div>
        <Footer />
    </Fragment>
  );
};

export default UpdateProfile;
