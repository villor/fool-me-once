import http from 'http';
import path from 'path';
import express from 'express';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
	io.emit('hello', 'Hello world!');
});

server.listen(process.env.PORT || 3000, () => {
	const {
		address,
		port
	} = server.address();

	console.log(`Fool-me-once listening at http://${address}:${port}`);
});
