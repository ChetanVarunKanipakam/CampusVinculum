// server.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

// import RoomUser from '../models/roomUser.model.js';
// import Message from '../models/message.model.js';
// import Room from '../models/room.model.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});


const Message = mongoose.model('Message', new mongoose.Schema({
  text: String, from: String, to: String,
  room: String, timestamp: String, private: Boolean
}));

const RoomUser = mongoose.model('RoomUser', new mongoose.Schema({
  room: String, username: String
}));

const users = {};
const usernameToSocket = {};
const onlineStatus = {};

// Private chat history endpoint
app.post('/private_history', async (req, res) => {
  const { userA, userB } = req.body.between;
  const history = await Message.find({
    private: true,
    $or: [
      { from: userA, to: userB },
      { from: userB, to: userA }
    ]
  }).sort({ _id: 1 });
  res.json(history);
});

io.on('connection', (socket) => {
  console.log('🟢', socket.id, 'connected');

  socket.on('join_room', async ({ username, room }) => {
    users[socket.id] = { username, room };
    usernameToSocket[username] = socket.id;
    onlineStatus[username] = true;

    await RoomUser.updateOne(
      { room, username },
      { room, username },
      { upsert: true }
    );

    socket.join(room);
    socket.to(room).emit('user_joined', `${username} joined ${room}`);

    const roomUsers = await RoomUser.find({ room }).distinct('username');
    io.to(room).emit('update_user_list', { users: roomUsers, onlineStatus });

    const history = await Message.find({ room, private: false })
      .sort({ _id: -1 }).limit(20);
    socket.emit('load_history', history.reverse());
  });

  socket.on('send_message', async ({ text }) => {
    const u = users[socket.id];
    if (!u) return;

    const msg = {
      text, from: u.username, room: u.room,
      timestamp: new Date().toLocaleTimeString(),
      private: false
    };
    await Message.create(msg);
    io.to(u.room).emit('receive_message', msg);
  });

  socket.on('private_message', async ({ from, to, text }) => {
    const ts = new Date().toLocaleTimeString();
    const msg = { text, from, to, timestamp: ts, private: true };
    await Message.create(msg);

    const dest = usernameToSocket[to];
    if (dest) io.to(dest).emit('receive_private_message', msg);
  });

  socket.on('typing', () => {
    const u = users[socket.id];
    if (u) socket.to(u.room).emit('show_typing', `${u.username} is typing...`);
  });

  socket.on('stop_typing', () => {
    const u = users[socket.id];
    if (u) socket.to(u.room).emit('hide_typing');
  });

  socket.on('disconnect', async () => {
    const u = users[socket.id];
    if (!u) return;

    delete users[socket.id];
    delete usernameToSocket[u.username];
    onlineStatus[u.username] = false;

    const roomUsers = await RoomUser.find({ room: u.room }).distinct('username');
    io.to(u.room).emit('user_left', `${u.username} left`);
    io.to(u.room).emit('update_user_list', { users: roomUsers, onlineStatus });
  });
});

export {io, server,app}
