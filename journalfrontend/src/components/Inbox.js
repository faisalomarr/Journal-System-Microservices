import React, { useState } from 'react';
import { Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_MESSAGES_URL } from '../config/apiConfig'; // Import the centralized URL

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${GET_MESSAGES_URL}?username=${username}`, { // Use centralized URL
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMessages(data); // Save messages to state
      })
      .catch(error => {
        console.error('Error getting messages', error);
        setErrorMessage("Error getting messages.");
      });
  };

  // Function to handle reply action
  const handleReply = (sender) => {
    localStorage.setItem("replyuser", sender);
    navigate("/message");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Inbox</Typography>
      <Button variant="contained" onClick={handleSubmit}>Load Messages</Button>

      {errorMessage && (
        <Alert severity="error" style={{ marginTop: '1rem' }}>{errorMessage}</Alert>
      )}

      <Box mt={2}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Box key={index} mb={2} p={2} border="1px solid #ddd">
              <Typography variant="h6">From: {message.sender}</Typography>
              <Typography variant="body1">To: {message.receiver}</Typography>
              <Typography variant="body1">Message: {message.text}</Typography>
              <Typography variant="body2">Sent on: {message.sentAt}</Typography>
              
              {/* Reply Button */}
              <Button 
                variant="outlined" 
                color="primary" 
                style={{ marginTop: '1rem' }} 
                onClick={() => handleReply(message.sender)}
              >
                Reply
              </Button>
            </Box>
          ))
        ) : (
          <Typography>No messages to display</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Inbox;
