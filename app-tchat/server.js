/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/08/2023
	Server tchat avec socket.io
*/

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // L'URL del'application cliente
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const port = 3001

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));


io.on('connection', (socket) => {
  console.log('Un client est connecté');

  socket.on('message', (message) => {
    // Traitez le message (par exemple, enregistrez-le en base de données)
    // Envoyez le message à tous les autres clients connectés
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Un client s\'est déconnecté');
  });
});

server.listen(port, () => {
  console.log(`Serveur du tchat écoute sur le port ${port}`);
});
