import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../css/Button.css"
import { useAuthToken } from '../AuthTokenContext'
import { useNavigate } from "react-router-dom";

const LogoutSignInButton = () => {
  const { logout } = useAuth0();
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const handleSigninLogout = () => {
    if ((accessToken === undefined)) {
      navigate(`/profile`)
    } else {
      logout({ returnTo: window.location.origin });
    }
  };

  return (
    <button className="secondaryButton" onClick={handleSigninLogout}>{(accessToken === undefined)? "Sign in" : "Log out"}</button>
  );
};

export default LogoutSignInButton;