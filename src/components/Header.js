import React from 'react';

import '../styles/Header.css';
import slowpokeSprite from '../assets/slowpoke.png';

function Header() {
	return (
		<div className="header">
			<div className="heading">
				<img className="left" src={slowpokeSprite} alt="slowpoke" />
				<h1>PokéMemory</h1>
				<img className="right" src={slowpokeSprite} alt="slowpoke" />
			</div>
		</div>
	)
}

export default Header;