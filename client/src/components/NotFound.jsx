import { useAuthToken } from '../AuthTokenContext'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Container from './Container';

export default function NotFound() {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      console.log("gg")
      navigate("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);
  
  return (
    <Container>
      <div>NotFound</div>
    </Container>
  )
}
