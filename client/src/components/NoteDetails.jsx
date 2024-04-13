import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Container from './Container';
import '../css/styles.css';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useAuthToken } from '../AuthTokenContext'

const NoteDetails = () => {
    const location = useLocation();
    const [currentNote, setCurrentNote] = useState(location.state.noteContent);
    const navigate = useNavigate();
    const { accessToken } = useAuthToken();
    const { id } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = `http://localhost:8000/journal/updatejournal`;
        const method = 'PUT';

        try {
            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    id: parseInt(id),
                    contents: currentNote,
                }),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            await response.json();
            navigate("/profile");
        } catch (error) {
            console.error(`Error updating note:`, error);
        }
    };

    const handleCancel = (event) => {
        navigate("/profile");
    };

    const handleNoteChange = (event) => {
        setCurrentNote(event.target.value);
    };

    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>View Journal</h1>
                <span id="dateText">{new Date(location.state.date).toLocaleDateString()}</span>
                <textarea id="note-text" value={currentNote} onChange={handleNoteChange}></textarea>
                <div id="btn-container">
                    <button type="submit" id="submitBtn" onClick={handleSubmit}>Update</button>
                    <button type="button" id="closeBtn" onClick={handleCancel}>Back</button>
                </div>
            </div>
        </Container>
    );
  }

  export default withAuthenticationRequired(NoteDetails, {
    // Customize behavior when redirecting to login
    onRedirecting: () => <div>Loading...</div>,
    returnTo: "/",
  });