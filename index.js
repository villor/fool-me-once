import http from 'http';
import path from 'path';
import express from 'express';
import socketio from 'socket.io';
import Room from './room.js';

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const rooms = [];

function addRoom(room) {
	rooms.push(room);
}

function deleteRoom(room) {
	const i = rooms.find(r => r === room);
	if (i >= 0) rooms.splice(i, 1);
	room.destroy();
}

io.on('connection', (socket) => {
	let room = null;

	socket.on('room', () => {
		if (room) {
			deleteRoom(room);
		}
		room = new Room(socket);
		addRoom(room);
	});

	socket.on('join', (roomId) => {
		// If in other room, leave it
		if (room) {
			room.removePlayer(socket);
		}

		// Find new room and join it
		room = rooms.find(room => room.getId() === roomId);
		if (room) {
			room.addPlayer(socket);
		} else {
			socket.emit('state', { alert: {
				error: true,
				message: "Room does not exist"
			}});
		}
	});

	socket.on('leave', () => {
		if (room) {
			room.removePlayer(socket);
			room = null;
		}
	});

	socket.on('disconnect', () => {
		if (room) {
			room.removePlayer(socket);
			if (room.getAdminSocket() === socket) {
				deleteRoom(room);
				room = null;
			}
		}
	});
});

server.listen(process.env.PORT || 3000, () => {
	const {
		address,
		port
	} = server.address();

	console.log(`Fool-me-once listening at http://${address}:${port}`);
});
