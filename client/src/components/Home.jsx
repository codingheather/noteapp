import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import { Helmet } from 'react-helmet';
import { useAuthToken } from '../AuthTokenContext'
import AddMoreButton from './AddMoreButton';
import Container from './Container';

const ROOT_PATH = process.env.REACT_APP_API_URL;
const Home = () => {
  const [numTotalNotes, setNumTotalNotes] = useState(0);
  const [numPersonalNotes, setNumPersonalNotes] = useState(0);
  const [quote, setQuote] = useState("");
  const { accessToken } = useAuthToken();

  useEffect(() => {
    const fetchTotalCount = async () => {
      const apiUrl = `${ROOT_PATH}/journal/totalCount`;
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const totalCount = await response.json();
        setNumTotalNotes(totalCount);
      } catch (error) {
        console.error('Error fetching total count', error);
      }
    };

    const fetchPersonalCount = async () => {
      const apiUrl = `${ROOT_PATH}/journal/personalCount`;
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const numNotes = await response.json();
        setNumPersonalNotes(numNotes.count === undefined ? 0 : numNotes.count);
      } catch (error) {
        console.error('Error fetching personal count', error);
      }
    };

    fetchTotalCount();
    if (accessToken !== undefined) {
      fetchPersonalCount();
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchQuote = async () => {
      const url = 'https://thought-of-the-day.p.rapidapi.com/thought';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9024e1e21fmshf89c1ac989aeed0p1ed8abjsnc73adb45435d',
          'X-RapidAPI-Host': 'thought-of-the-day.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        setQuote(jsonData.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (quote == "") {
      fetchQuote();
    }
  }, []);
  
  console.log(numPersonalNotes)

  return (
    <Container>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Helmet>
      <div className="welcome-section">
        <h1>Welcome back!</h1>
        <p className="subtext">Today is {new Date().toLocaleDateString()}</p>
      </div>
      <div className="note-section">
        <div className="note-stats">
          <h2>Total Recorded Notes from All Users</h2>
          <p className="note-count">{numTotalNotes}</p>
        </div>
        {accessToken !== undefined && (
          <div className="note-stats">
            <h2>You wrote</h2>
            <p className="note-count">{numPersonalNotes}</p>
            <h2>of them!</h2>
          </div>
        )}
      </div>
      <AddMoreButton />
      <div className="quote-section">
        <h1>A wise person once noted:</h1>
        <p className="quoteText">{quote}</p>
      </div>
    </Container>
  );
};

export default Home;