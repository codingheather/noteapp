import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import "../css/AuthDebugger.css";
import Container from "./Container";

function AuthDebugger() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();

  return (
    <Container>
      <div className="auth-debugger-container">
        <div className="token-box">
          <p className="box-title">Access Token:</p>
          <pre className="box-content">{JSON.stringify(accessToken, null, 2)}</pre>
        </div>
        <div className="user-info-box">
          <p className="box-title">User Info:</p>
          <pre className="box-content">{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </Container>
  );
}

export default withAuthenticationRequired(AuthDebugger, {
  // Customize behavior when redirecting to login
  onRedirecting: () => <div>Loading...</div>,
  returnTo: "/",
});