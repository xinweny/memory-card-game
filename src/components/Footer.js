import React from 'react';

import '../styles/Footer.css';
import ghIcon from '../assets/github.svg';

function Footer() {
	return (
		<div className="footer">
			<p>Made by <a href="https://github.com/xinweny">xinweny</a> in 2023</p>
			<img src={ghIcon} alt="Github" />
		</div>
	)
}

export default Footer;