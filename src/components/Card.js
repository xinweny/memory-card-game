import React, { useEffect } from 'react';

import '../styles/Card.css';

function Card({ handleClick, name, url }) {
	useEffect(() => {
		return () => window.removeEventListener('click', handleClick);
	});

	const fName = name.split('-').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');

	return (
		<div className="card" onClick={() => {
			handleClick();
		}}>
			<img className="pokemon-border" src={url} alt={name} />
			<span>{fName}</span>
		</div>
	)
}

export default Card;