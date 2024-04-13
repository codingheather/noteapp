import React from "react";
import '../css/styles.css';
import LogoutSignInButton from "./LogoutSignInButton";
import { Link } from 'react-router-dom';


const Container = ({ children }) => {
  return (
    <div id="container">
      <div className="topnav">
        <div className="left-links">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
        </div>
        <div className="logout-button">
          <LogoutSignInButton/>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Container;