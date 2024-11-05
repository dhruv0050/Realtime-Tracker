const express = require("express");
const app = express();
const path = require("path")
const http = require("http");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
const socketio = require("socket.io")
const server = http.createServer(app)
const io = socketio(server)
io.on("connection" , function(socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id: socket.id, ...data})
    })
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })

})
app.get("/",(req,res)=>{
    res.render("index")
})
const PORT = 3000;
server.listen(PORT);