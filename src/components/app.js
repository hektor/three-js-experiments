import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Home from '../routes/home';
import Profile from '../routes/profile';

import * as Three from 'three';

class Scene extends Component {
	
	scene = new Three.Scene()
	renderer = new Three.WebGLRenderer()
	
	create = () => {
	  this.camera = new Three.PerspectiveCamera(this.props.zoom, window.innerWidth / window.innerHeight, 0.1, 1000 );
	  const geometry = new Three.SphereGeometry(2, 64, 64);
	  const material = new Three.MeshStandardMaterial({
			color: '#333',
			roughness: 0.05,
			metalness: 0.95
	  });
	  this.sphere = new Three.Mesh(geometry, material);
	  this.camera.position.z = 5;
	  this.light = new Three.PointLight(0xffffff);
	  this.light.position.x = 10;
	  this.light.position.y = 50;
	  this.light.position.z = 130;
	  this.scene.add(this.sphere);
	  this.scene.add(this.light);
	  this.camera.position.z = 5;
	  this.renderer.gammaInput = true;
	  this.renderer.gammaOutput = true;
	}
	
	componentDidMount() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.dom.appendChild(this.renderer.domElement);
		this.create();
		this.update();
	}
	
	componentWillReceiveProps(props) {
		if (props.zoom !== this.props.zoom) {
			this.camera.fov = props.zoom;
			this.camera.updateProjectionMatrix();
		}
	}
	
	update = () => {
	  requestAnimationFrame(this.update);
	  this.sphere.rotation.x += .1;
	  this.sphere.position.y+=.05;
	  this.renderer.render(this.scene, this.camera);
	  if (this.sphere.position.y > 5 ) {this.sphere.position.y = -4;}
	}
  
	ref = r => {
	  this.dom = r;
	}
  
	render = () => (
	  <div ref={this.ref} />
	)
}

export default class App extends Component {
	
	state = { zoom: 50 }

	zoomIn = () => this.state.zoom >= 0 && this.setState({ zoom: this.state.zoom - 5 })
  	zoomOut = () => this.state.zoom <= 95 && this.setState({ zoom: this.state.zoom + 5 })

	
  	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render = (props, { zoom }) => (
		<div id="app">
			<Header />
			<Scene zoom={zoom} />
			<button onClick={this.zoomIn}>In</button>
			<button onClick={this.zoomOut}>Out</button>
			<Router onChange={this.handleRoute}>
				<Home path="/" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
			</Router>
		</div>
	)
}
