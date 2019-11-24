import { h, Component } from 'preact';
import * as Three from 'three';

export default class ThreeScene extends Component {
	
	create = () => {
		this.scene = new Three.Scene();
		this.camera = new Three.PerspectiveCamera(this.props.zoom, window.innerWidth / window.innerHeight, 0.1, 1000 );
		const geometry = new Three.SphereGeometry(1, 32, 32);
		const material = new Three.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, shininess: 10, opacity: 0.9, transparent: true } );
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

	update = () => {
		this.frame = requestAnimationFrame(this.update);
		this.sphere.rotation.x += .1;
		this.renderer.render(this.scene, this.camera);
	}
	
	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;
		this.renderer = new Three.WebGLRenderer({ antialias: true });
		this.renderer.setSize(width, height);
		this.mount.appendChild(this.renderer.domElement);
		this.create();
		this.update();
	}
	
	componentWillReceiveProps(props) {
		if (props.zoom !== this.props.zoom) {
			this.camera.fov = props.zoom;
			this.camera.updateProjectionMatrix();
		}
	}
    
	componentWillUnmount() {
		cancelAnimationFrame(this.frame);
		this.mount.removeChild(this.renderer.domElement);
	}
	
	render = () => (
		<div
			style={{
				position: 'fixed',
				width: '100vw',
				height: '100vh',
				overflow: 'hidden',
				zIndex: -1
			}}
			ref={element => (this.mount = element)}
		/>
	)
}