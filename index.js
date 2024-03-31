

const express = require('express')

const {createServer} = require('http')
const {join} = require('path')
const {Server} = require('socket.io')

const app = express()


const server = createServer(app)

const io = new Server(server)



app.get('/', (req, res)=>{
    // res.send('<h1>Hello world</h1>');
    res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket)=>{
    console.log('user connected', socket.id);
    socket.on('disconnected', ()=>{
    console.log('user disconnected');
    })
})

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(4000, (req, res)=>{
    console.log('server started on port 4000');
})