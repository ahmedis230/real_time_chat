
const express= require('express')
const { Server } = require('socket.io');
const {join}=require('path')
const http =require('http')
const app=express()
const server = http.createServer(app)
const port=process.env.PORT || 3001

const io=new Server(server)

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);

      io.emit('send_messages_to_all_users:',msg)
    });

    socket.on('typing',()=>{
        socket.broadcast.emit('show_typing_status')
    })

    socket.on('stop_typing',()=>{
        socket.broadcast.emit('clear_typing_status')
    })

    socket.on('disconnect',()=>{
        console.log("leave the chat with socet id"+ socket.id);
    })
  });
  
  




app.get('/',(req,res)=>{
    console.log(__dirname);
    res.sendFile(join(__dirname,'index.html'))
})



server.listen(port, ()=>{
    console.log("app listening on port "+ port);
})


