import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<a href="/">
			<h1>Three.js experiments</h1>
		</a>
		<nav>
			<Link activeClassName={style.active} href="/example-1">Example 1 - </Link>
			<Link activeClassName={style.active} href="/example-2">Example 2 - </Link>
			<Link activeClassName={style.active} href="/example-3">Example 3 - </Link>
		</nav>
	</header>
);

export default Header;
