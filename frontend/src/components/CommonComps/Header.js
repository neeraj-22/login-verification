import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../actions/userAction";
import './Header.css'

const Header = ({sInActive}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(signout())
    navigate(`/signout`)
  }

  return (
    <Fragment>
      <div className="navContainer">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={'/'}>
          <span className="navbar-brand mb-0 h3">Login Verification</span>
          </Link>
          <ul className="nav justify-content-center">

          <li className="nav-item"  {...sInActive === 1 ? {style:{visibility:"hidden"}} : ""}>
              <Link className="nav-link" to={'/signup'}>
                Signup
              </Link>
            </li>
            <li className="nav-item"  {...sInActive === 1 ? {style:{visibility:"hidden"}} : ""}>
              <Link className="nav-link" to={'/signin'}>
                Signin
              </Link>
            </li>
            <li className="nav-item"  {...sInActive === 1 ? "" : {style:{display:"none"}}}>
                <button onClick={handleSignout} className="nav-link" style={{backgroundColor:"transparent", outline:"none", border:"none" }}>
                logout
                </button>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    </Fragment>
  );
};

export default Header;
