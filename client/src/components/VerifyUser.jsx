import "../style/appLayout.css";

import { useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    if (accessToken) {
      navigate("/home");;
    }
  }, [accessToken, navigate]);

  return <div className="loading">Loading...</div>;
}
