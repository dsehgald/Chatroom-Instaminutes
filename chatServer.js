const path = require('path');
const http = requore('http');
const express = require('express');
const soketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');


const app = express();
const server = http.creayeServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

io.on('connection', socket => {
    socket.on('joinRoom' ({username, room}) => {
        const user : userJoin(socket,id, username, room);

        socket.join(user.room),
        
    socket.emit({'message': formatMessage(botName, 'Welcome to ChatRoom!'}),

    socket.broadcast.to(user.room).emit('message', formatMessage('botName', `${user.usernae} has joiined the chat`),

    io.to(user.room).emit('roomUsers', {
        room; user.room,
        users : getRoomUsers(user.room)
    });
});

socket.on('chatMessage', msg =>{
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg);
});

socket.on('disconnect' () => {
    const user = userLevae(socket.id);

    if(user) {
        io.to(user.room).emit('message', formatMessage(botName, ${user.name} has left the chat))
    }
});

socket.on('disonnet', () => {
    const user = userLevae(socket.id);

    if(user) {
        io.to(user.room).emit
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
    };
});
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log{'Server running on port ${PORT}'});