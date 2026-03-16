# EWS Socket - Earthquake & Tsunami Warning System

A Socket.IO server that streams real-time earthquake and tsunami data from BMKG (Indonesian Meteorological, Climatological, and Geophysical Agency).

## Features

- Real-time earthquake data updates via Socket.IO
- Real-time tsunami data updates via Socket.IO
- Auto-refresh every 1 second
- CORS enabled for all origins

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## Running the Server

Start the server in development mode:

```bash
npm run dev
```

The server will start on **port 8001** (or the port specified in `PORT` environment variable).

## Socket Events

### Server Events (emit to clients)

| Event | Description |
|-------|-------------|
| `gempa` | Earthquake data from BMKG |
| `tsunami` | Tsunami data from BMKG |
| `message` | Connection confirmation message |

## Client Example

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:8001');

// Listen for earthquake data
socket.on('gempa', (data) => {
  console.log('Earthquake data:', data);
});

// Listen for tsunami data
socket.on('tsunami', (data) => {
  console.log('Tsunami data:', data);
});

// Listen for connection message
socket.on('message', (msg) => {
  console.log(msg);
});
```

## Data Source

- Earthquake: https://bmkg-content-inatews.storage.googleapis.com/lastQL.json
- Tsunami: https://bmkg-content-inatews.storage.googleapis.com/datagempa.json
