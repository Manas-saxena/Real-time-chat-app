const express = require("express");
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http ,{
    cors:{
        origin:"*",
    }
});


io.on("connection" , (socket) =>{
    console.log("what is socket:" , socket );
    console.log("socket is active to be connected");

    socket.on("chat" , (payload) =>{
        console.log("wahts payload",payload);
        io.emit("chat",payload)
    })
})

http.listen(8000 , () =>{
    console.log("server is active...");
})