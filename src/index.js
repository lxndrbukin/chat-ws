const express = require('express');
const WebSocket = require('ws');
const WebSocketServer = require('ws').WebSocketServer;
const path = require('path');

const app = express();
app.use(express.static(path.resolve('./public')));

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('SOCKET CONNECTED');
  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if (client === ws) {
          client.send(JSON.stringify({ ...msg, currentUser: true }));
        } else {
          client.send(JSON.stringify({ ...msg, currentUser: false }));
        }
      }
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => console.log('SERVER IS RUNNING ON PORT', PORT));
