/**
 * Setup socket connection with socketio
 */

const { Server } = require('socket.io');

let io;

const socketConnection = (server) => {
  io = new Server(server, {
    cors : {
      origin : "http://localhost:80",
      methods : ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('new person connected.');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
}

const updateData = (username, payload) => {
  io.emit(`update-${username}`, { 
    orders: payload
  });
}

module.exports = { socketConnection, updateData };