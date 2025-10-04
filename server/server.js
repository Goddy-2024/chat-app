import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server, Socket } from 'socket.io';


//Create Express app
const app = express();
const server = http.createServer(app);


//Initialize the Socket.io Server:
export const io = new Server(server, {
  cors: {origin: "*"}
})

//Store online Users
export const userSocketMap = {}; //{userId: socketId}

//Socket.ioListener
io.on("connection", (Socket)=>{
  const userId = Socket.handshake.query.userId;
  console.log("User connected", userId);

  if(userId) userSocketMap[userId] = Socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //Disconnect event
  Socket.on("disconnect", ()=>{
    console.log("User Diconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

  })


})


//Middleware setup
app.use(express.json({limit: "4mb"}));
app.use(cors());

//Routes Setup
app.use("/api/status", (req, res)=> res.send({msg: "Server is live"}));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);






const PORT  =  process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const ENVIRONMENT = process.env.NODE_ENV;

//STATS logging middleware:
app.use((req, res, next) => {
  console.log(`Just received a request of method ${req.method} ID ${req.path}`);
  next(); // Pass control to the next middleware/route handler
});

connectDB(MONGO_URI, ENVIRONMENT).then(()=>{
    server.listen(PORT, (req, res)=>{
        console.log(`Server running Successfully on PORT: ${PORT}!`)
    })
})

