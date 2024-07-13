const io = require('socket.io')();
const socketapi = {
    io: io
};

let users = {};

io.on("connection", socket => {
    
    socket.on("sendUsername", username => {
        users[socket.id] = username;
        socket.emit("successMessage", { message: "Username added successfully", ready: "Start Chatting", nameOfUser: users[socket.id] });
    })

    socket.on("sendMessage", function (userMessage) {
        socket.broadcast.emit("recievedMessage", { message: userMessage, nameOfUser: users[socket.id] })
    })

    socket.on("joined-chat", function(nameOfJoineduser){
        socket.broadcast.emit("user-joined", nameOfJoineduser)
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("userDisconnected", users[socket.id]);
        delete users[socket.id]
    })
})



module.exports = socketapi;