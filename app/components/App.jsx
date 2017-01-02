import React from 'react';
import io from 'socket.io-client';
import Start from './Start.jsx';

export default class App extends React.Component {
	state = {
		socket: io(),
		messages: []
	}
	componentDidMount() {
		const socket = this.state.socket;
		socket.on('hello', (msg) => this.setState((state) => ({ messages: state.messages.concat(msg) })));
	}
	render() {
		return (
			<ul>
				{this.state.messages.map(msg => (
					<li>{msg}</li>
				))}
			</ul>
		);
	}
}
