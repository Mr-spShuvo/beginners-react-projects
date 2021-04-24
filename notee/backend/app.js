require('dotenv').config();
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const Note = require('./Note');

const defaultData = '';

const findOrCreateNote = async id => {
  if (!id) return;
  const note = await Note.findById(id);
  if (note) return note;
  return await Note.create({ _id: id, data: defaultData });
};

const PORT = process.env.PORT ?? 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const DB_URL = process.env.DB_URL;
if (!CLIENT_URL || !DB_URL) throw new Error('Environment variables is not set yet.');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const io = socketIO(PORT, {
  cors: { origin: CLIENT_URL, methods: ['GET', 'POST'] }
});

io.on('connection', socket => {
  socket.on('get-note', async noteId => {
    const { data } = await findOrCreateNote(noteId);
    socket.join(noteId);
    socket.emit('load-note', data);

    socket.on('send-changes', delta => {
      socket.broadcast.to(noteId).emit('receive-changes', delta);
    });

    console.log(data);

    socket.on('save-note', async data => {
      console.log(data);
      await Note.findByIdAndUpdate(noteId, { data });
    });
  });
});
