const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const gameNSP = io.of('/game');
const Game = require('./Players')
const PORT = process.env.PORT || 3000;

server.listen(PORT)
console.log('server running on port ' + PORT + '...')
// Routing and static file servering
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '../index.html');
});

// Gloval connections list
let connections = [];
// Global room list
let roomCount = 0;
let rooms = [];

// Create new room if last current room is full
function createNewRoom() {
    roomCount++;
    let newRoom = `room:${roomCount}`;
    rooms.push(newRoom)
    console.log(rooms)
    console.log(rooms[rooms.length-1])
}

//socket.IO '/' listener
io.on('connection', lobbyConnection);

// socket.IO '/' callback
function lobbyConnection(socket) {
    matchMaker(socket);
    socket.on('hello-room', (room, msg) => {
        socket.to(room).emit('inc-hello-room', 'this is an emit from room to room via server');
    })
    socket.on('disconnect', handleDisconnect);
}


let waitingPlayer = null;
function matchMaker (socket) {
    if(waitingPlayer) {
      addToRoom(waitingPlayer, socket);
      new Game(waitingPlayer, socket)
      waitingPlayer = null;
    } else {
      waitingPlayer = socket;
    }
}


function addToRoom(s1, s2) {
    let player = 1;
    createNewRoom();
    [s1, s2].forEach(s => {
        s.join(rooms[rooms.length-1])
    });
    s1.to(rooms[rooms.length-1]).emit('welcomeToRoom', rooms[rooms.length-1], player);
    player++;
    s2.to(rooms[rooms.length-1]).emit('welcomeToRoom', rooms[rooms.length-1], player);
}
  
  function handleDisconnect() {
    rooms.forEach((room, index) => {
        if(io.sockets.adapter.rooms[room] === undefined) {
            rooms.splice(rooms.indexOf(index), 1)
        }
    });
    if(Object.entries(io.sockets.adapter.rooms).length === 0 && io.sockets.adapter.rooms.constructor === Object) {
        roomCount = 0;
    }
  }


gameNSP.on('connection', gameHost);

function gameHost() {


}

