const Server = require('./src/server.js');
const app = Server.app();
const httpServer = require('http').Server(app);
const port = (process.env.PORT || 3000);
const io = require('socket.io')(httpServer);

let socketSet = [];

httpServer.listen(port);
console.log(`Listening on http://localhost:${port}`);

io.on('connection', (socket) => { 
  const numClients = socket.conn.server.clientsCount;
  const socketID   = socket.id;

  if (socketSet.indexOf('!') > -1) {
    let index  = socketSet.indexOf('!');
    socketSet[index] = socketID
  } else {
    socketSet.push(socketID)
  }

  let socketIndex = socketSet.indexOf(socketID);

  if (numClients % 2 === 0) {
    let prevSocket  = (socketIndex > 0) ? socketSet[socketIndex-1] : 0;
    
    io.to(socketID).emit('playerO', numClients);
    io.to(prevSocket).emit('matchFound')
  } else {
    io.to(socketID).emit('playerX', numClients)
  }

  socket.on('boardMove', (data) => {
    let socketIndex = socketSet.indexOf(socketID);
    let prevSocket  = (socketIndex > 0) ? socketSet[socketIndex-1] : 0
    let nextSocket  = socketSet[socketIndex+1] || socketSet[socketIndex] || null
    let destination = (socketIndex + 1) % 2 === 0 ? prevSocket : nextSocket

    if (destination)
      io.to(destination).emit('playerMove', data)
  });

  socket.on('reset', () => {
    let socketIndex = socketSet.indexOf(socketID);
    let prevSocket  = (socketIndex > 0) ? socketSet[socketIndex-1] : 0
    let nextSocket  = socketSet[socketIndex+1] || socketSet[socketIndex] || null
    let destination = (socketIndex + 1) % 2 === 0 ? prevSocket : nextSocket

    if (destination)
      io.to(destination).emit('reset');
  });

  socket.on('winner', (winner) => {
    let socketIndex = socketSet.indexOf(socketID);
    let prevSocket  = (socketIndex > 0) ? socketSet[socketIndex-1] : 0;
    let nextSocket  = socketSet[socketIndex+1] || socketSet[socketIndex] || null;
    let destination = (socketIndex + 1) % 2 === 0 ? prevSocket : nextSocket;

    if (destination)
      io.to(destination).emit('winner', winner)
  });
});
