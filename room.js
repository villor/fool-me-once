function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export default class Room {
	_players = [];

	constructor(adminSocket) {
		this._id = getRandomInt(1, 1000000).toString();
		this._adminSocket = adminSocket;
		this.emitState();
	}

	getId() {
		return this._id;
	}

	getAdminSocket() {
		return this._adminSocket;
	}

	destroy() {
		this._players.forEach(p => {
			p.socket.emit('state', { room: null });
		});
	}

	addPlayer(socket) {
		this._players.push({
			name: 'Newb',
			socket: socket
		});
		this.emitState();
	}

	removePlayer(socket) {
		const i = this._players.findIndex(p => p.socket === socket);
		if (i >= 0) {
			this._players.splice(i, 1);
		}
		this.emitState();
	}

	emitState() {
		const roomState = {
			id: this._id,
			players: this._players.map(p => p.name)
		}

		this._players.forEach(p => {
			p.socket.emit('state', {
				room: roomState
			});
		});

		this._adminSocket.emit('state', {
			room: roomState,
			admin: {
			// Add admin specific data here
			}
		});
	}
}
