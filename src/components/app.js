import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Home from '../routes/home';
import Profile from '../routes/profile';
import ThreeScene from './three/ThreeScene';

export default class App extends Component {
	
	state = { zoom: 50 }

	zoomIn = () => this.state.zoom >= 0 && this.setState({ zoom: this.state.zoom - 5 })
	zoomOut = () => this.state.zoom <= 95 && this.setState({ zoom: this.state.zoom + 5 })

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render = (props, { zoom }) => (
		<div id="app">
			<Header />
			<ThreeScene zoom={zoom} />
			<button onClick={this.zoomIn}>In</button>
			<button onClick={this.zoomOut}>Out</button>
			<Router onChange={this.handleRoute}>
				<Home path="/example-1" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
			</Router>
		</div>
	)
}
