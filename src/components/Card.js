import React, { useEffect } from 'react';

import '../styles/Card.css';

function Card({ handleClick, name, url }) {
	useEffect(() => {
		return () => window.removeEventListener('click', handleClick);
	});

	let fName = name.split('-')[0];
	fName = fName.charAt(0).toUpperCase() + fName.slice(1)

	return (
		<div className="card pokemon-border" onClick={handleClick}>
			<img src={url} alt={name} />
			<span>{fName}</span>
		</div>
	)
}

export default Card;