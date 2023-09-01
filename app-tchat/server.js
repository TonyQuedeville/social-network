/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/08/2023
	Server tchat avec socket.io
*/

const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // L'URL del'application cliente
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const port = 3001

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions))

const connectedUsers = {} // Liste des users connectés
const activeUsersByRoom = {} // liste des users de la conversation sélectionnée

io.on('connection', (socket) => {
  // Ajouter les informations de l'utilisateur au tableau des utilisateurs connectés
  socket.on('userConnect', (userPseudo) => {
    connectedUsers[socket.id] = userPseudo

    const userList = Object.values(connectedUsers)
    io.emit('connectedUsersList', userList)
  })

  // Écoute de la demande de la liste des utilisateurs connectés
  socket.on('getConnectedUsers', () => {
    // Récupérez les informations des utilisateurs connectés depuis l'objet connectedUsers
    const userList = Object.values(connectedUsers)
    socket.emit('connectedUsersList', userList)
  })

  // Room utilisée pour les conversations de groupe
  socket.on('joinRoom', ({ roomName, user }) => {

    // Quitter toutes les autres conversations
    const roomKeys = Array.from(socket.rooms)
    roomKeys.forEach((room) => {
      if (room !== socket.id && room !== socket.id.toString()) {
        socket.leave(room)
        if (activeUsersByRoom[room]) {
          delete activeUsersByRoom[room][socket.id]
        }
      }
    });

    // Rejoindre la conversation sélectionnée
    socket.join(roomName)
    if (!activeUsersByRoom[roomName]) {
      activeUsersByRoom[roomName] = {}
    }
    activeUsersByRoom[roomName][socket.id] = true
    io.to(roomName).emit('notif', `${user} a rejoint la conversation: ${roomName}`)
  });

  // Retirer l'utilisateur actif de la conversation
  socket.on('quitRoom', ({user}) => {
    const roomKeys = Array.from(socket.rooms)
    
    roomKeys.forEach((room) => {
      if (room !== socket.id && room !== socket.id.toString()) {
        socket.leave(room)
        io.to(room).emit('notif', `${user} a quitté la conversation.`)
        if (activeUsersByRoom[room]) {
          delete activeUsersByRoom[room][socket.id]
        }
      }
    });
  })

  // Message
  socket.on('message', (message) => {
    //console.log("message:", message);
    // Traitez le message (par exemple, enregistrez-le en base de données)

    // Envoyez le message à tous les clients connectés y compris l'emeteur du message    
    if(message.type === 'private') {
      const destinataireSocketId = getSocketIdbyDestinataire(message.destinataire)
      io.to(socket.id).emit('message', message)
      io.to(destinataireSocketId).emit('message', message)
    } else { // type === 'group
      io.to(message.destinataire).emit('message', message)
    }
  });
  
  // Déconnection
  socket.on('disconnect', () => {
    // Retirer l'utilisateur actif de toutes les conversations
    for (const room in socket.rooms) {
      if (room !== socket.id) {
        delete activeUsersByRoom[room][socket.id]
      }
    }

    // Retirer l'utilisateur actif de la liste des users connectés
    const userPseudo = connectedUsers[socket.id]
    if (userPseudo) {
      delete connectedUsers[socket.id]
      const userList = Object.values(connectedUsers)
      socket.broadcast.emit('connectedUsersList', userList)
    }

    console.log(`${userPseudo} s'est déconnecté`)
  });
});

server.listen(port, () => {
  console.log(`Serveur du tchat écoute sur le port ${port}`)
});


/* --- Fonctions --- */

function getSocketIdbyDestinataire(destinataire) {
  let socketId = null

  for (const id in connectedUsers) {
    if (connectedUsers[id] === destinataire) {
      socketId = id
      break
    }
  }

  return socketId
}
