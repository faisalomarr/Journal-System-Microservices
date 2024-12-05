import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { SEND_MESSAGE_URL } from '../config/apiConfig'; // Import the centralized URL

function Message() {
  const [receiverUsername, setReceiverUsername] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [message, setMessage] = useState('');
  const senderUsername = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageForm = {
      sender: senderUsername,
      receiver: receiverUsername,
      text: messageContent,
    };

    fetch(SEND_MESSAGE_URL, { // Use centralized URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageForm),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use text instead of JSON
      })
      .then(data => {
        if (data) {
          console.log('Message sent:', data); // Log the response if there is any
        }
        setMessage("Message sent successfully!");
        setReceiverUsername('');
        setMessageContent('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setMessage("Error sending message.");
      });
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Send Message
      </Typography>
      {message && (
        <Alert severity={message.includes("Error") ? "error" : "success"}>
          {message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Recipient Username"
          variant="outlined"
          fullWidth
          value={receiverUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Message Content"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Message
        </Button>
      </form>
    </Box>
  );
}

export default Message;
