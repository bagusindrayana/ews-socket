const http = require('http');
const axios = require('axios');
const { Server } = require('socket.io');
// var express = require('express');
// var app = express();


const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (use specific URLs in production for security)
    methods: ['GET', 'POST'],
  },
});


// Function to fetch data from the API
async function fetchGempa() {
  try {
    const timestamp = new Date().toISOString();
    const response = await axios.get("https://bmkg-content-inatews.storage.googleapis.com/lastQL.json?t=" + timestamp);
    const data = response.data;

    io.emit('gempa', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchTsunami() {
  try {
    const timestamp = new Date().toISOString();
    const response = await axios.get("https://bmkg-content-inatews.storage.googleapis.com/datagempa.json?t=" + timestamp);
    const data = response.data;

    io.emit('tsunami', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Set up a connection event
io.on('connection', (socket) => {
  //console.log('New client connected');

  // Optional: send an initial message to the connected client
  socket.emit('message', 'Connected to the server');

  // When client disconnects
  socket.on('disconnect', () => {
    //console.log('Client disconnected');
  });
});

// Fetch data every second
setInterval(fetchGempa, 1000);
setInterval(fetchTsunami, 1000);

// Start the server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
