const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const {addUser,removeUser,getUser,getUsersInRoom} =require( './users')
const router = require('./router');

const app=express();

const PORT=process.env.PORT|| 5000;
const server=http.createServer(http)
const io=socketio(server);

app.use(cors());
app.use(router);


server.listen(PORT,()=>{
    console.log(`server is up and running AT PORT ${PORT}`)
})

io.on('connection',(socket)=>{

    console.log('connection is established')

socket.on('join',({name,room},callback)=>{


    const {error,user} = addUser({id:socket.id,name,room});
    if(error) return callback(error);


    

    socket.join(user.room);
    socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`})
    socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined the room`});

    io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})

    callback();
 
})

socket.on('sendMessage',(message, callback)=>{

    const user=getUser(socket.id)

    io.to(user.room).emit('message',{user:user,text:message})
    
    callback();

})

socket.on('disconnect',()=>{

    const user=removeUser(socket.id);

    if(user){
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left ${user.room}`})
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
    }


})


}




)
