import React from 'react';
import io from 'socket.io-client';

export default class App extends React.Component {
	state = {
		socket: io()
	}

	componentDidMount() {
		this.state.socket.on('state', (state) => this.setState(state));
	}

	joinRoom(code) {
		this.state.socket.emit('join', code);
	}

	handleChange(e) {
		this.setState({inputValue: e.target.value});
	}

	handleJoinClick() {
		this.joinRoom(this.state.inputValue);
	}

	handleCreateClick() {
		this.state.socket.emit('room');
	}

	render() {
		return (
			<div>
				{this.state.room ? (
					<div>
						<p>In room: {this.state.room.id}<br/>Players:</p>
						<ul>
							{this.state.room.players.map(p => <li>{p}</li>)}
						</ul>
					</div>
				) : (
					<div>
						<input onChange={e => this.handleChange(e)} placeholder="join room"></input>
						<button onClick={e => this.handleJoinClick(e)}>Join</button>
						<br/><button onClick={e => this.handleCreateClick(e)}>Create room</button>
					</div>
				)}
				{this.state.alert &&
					<p>{this.state.alert.message}</p>
				}
			</div>
		);
	}
}
