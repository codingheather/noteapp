import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Button.css"


function AddMoreButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  return <button className="primaryButton" onClick={handleClick}>Write a new note!</button>;
}

export default AddMoreButton;