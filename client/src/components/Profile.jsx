import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { Helmet } from 'react-helmet';
import { useAuthToken } from '../AuthTokenContext'
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Container from './Container';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [newName, setNewName] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUsernamePopupOpen, setIsUsernamePopupOpen] = useState(false);
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    console.log(accessToken)
    const apiUrl = 'http://localhost:8000/journal/alljournals';
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }});
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchName = async () => {
    console.log(accessToken)
    const apiUrl = 'http://localhost:8000/user/name';
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }});
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const fetchedName = await response.json();
      setCurrentName(fetchedName);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    if (accessToken !== undefined) {
      fetchNotes();
      fetchName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleNoteChange = (event) => {
    setCurrentNote(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = 'http://localhost:8000/journal/newjournal';
    const method = 'POST';

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          contents: currentNote,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await response.json();
      fetchNotes();
      closePopup();
    } catch (error) {
      console.error(`Error creating note:`, error);
    }
  };

  const openPopup = (note = '') => {
    setIsPopupOpen(true);
    setCurrentNote(note);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentNote('');
  };

  // Function to open username change popup
  const openUsernamePopup = () => {
    setIsUsernamePopupOpen(true);
  };

  // Function to close username change popup
  const closeUsernamePopup = () => {
    setIsUsernamePopupOpen(false);
  };

  // Function to handle username change
  const handleUsernameChange = (event) => {
    setNewName(event.target.value);
  };

  // Function to submit new username
  const handleSubmitUsername = async () => {
    const apiUrl = 'http://localhost:8000/user/name';
    const method = (currentName === undefined || currentName === "") ? 'POST' : "PUT";

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: newName
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await response.json();
      fetchName()
      closeUsernamePopup();
    } catch (error) {
      console.error(`Error creating note:`, error);
    }
    closeUsernamePopup();
  };

  const showNote = (id) => {
    const noteToShow = notes.find(note => note.id === id);
    if (noteToShow) {
      console.log(noteToShow.contents);
      navigate(`/details/${id}`, { state: { 
        noteContent: noteToShow.contents,
        date: noteToShow.updatedAt
      }})
    }
  };

  const deleteNote = async (id) => {
    const apiUrl = `http://localhost:8000/journal/${id}`;
    try {
      const response = await fetch(apiUrl, { 
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await response.json();
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Container>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Helmet>
      <h1>Hello{(currentName === undefined || currentName === "") ? `` : ` ${currentName}`}! How are you doing today?</h1>
      <button className="primaryButton" onClick={openUsernamePopup}>{((currentName === undefined || currentName === ""))? "Set your name" : "Change your name"}</button>
      <p id="date">Today's date is: {new Date().toLocaleDateString()}</p>
      <div id="list-header">
        <div id="addNoteDiv" onClick={() => openPopup()}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>

      <div id="list-container">
        <ul id="notes-list">
          {notes.map(note => (
            <li key={note.id}>
              <span id="dateText">{new Date(note.updatedAt).toLocaleDateString()}</span>
              <span id="contentText">{note.contents}</span>
              <div id="noteBtns-container">
                <button id="editBtn" onClick={() => showNote(note.id)}><i className="fa-solid fa-pen"></i></button>
                <button id="deleteBtn" onClick={() => deleteNote(note.id)}><i className="fa-solid fa-trash"></i></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isPopupOpen && (
        <div id="popupContainer">
            <h1>New Journal</h1>
            <textarea id="note-text" placeholder="How is your mood today..." value={currentNote} onChange={handleNoteChange}></textarea>
            <div id="btn-container">
              <button type="submit" id="submitBtn" onClick={handleSubmit}>{'Create'}</button>
              <button type="button" id="closeBtn" onClick={closePopup}>Close</button>
            </div>
        </div>
      )}

      {isUsernamePopupOpen && (
        <div id="namePopupContainer">
            <h1>What do you want to be called?</h1>
            <textarea id="name" value={newName} onChange={handleUsernameChange}></textarea>
            <div id="btn-container">
              <button type="submit" id="submitBtn" onClick={handleSubmitUsername}>{'Submit'}</button>
              <button type="button" id="closeBtn" onClick={closeUsernamePopup}>Close</button>
            </div>
        </div>
      )}
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  // Customize behavior when redirecting to login
  onRedirecting: () => <div>Loading...</div>,
  returnTo: "/",
});