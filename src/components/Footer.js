import React from 'react';

import '../styles/Footer.css';
import ghIcon from '../assets/github-pixel.png';

function Footer() {
	return (
		<div className="footer">
			<p>Made by <a href="https://github.com/xinweny">xinweny</a> in 2023</p>
			<a href="https://github.com/xinweny/memory-card-game">
				<img src={ghIcon} alt="Github" />
			</a>
		</div>
	)
}

export default Footer;