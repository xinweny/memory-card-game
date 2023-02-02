import React, { useEffect } from 'react';

import '../styles/Card.css';

function Card(props) {
	const { name, imgUrl } = props.pokemon;

	useEffect(() => {
		return () => window.removeEventListener('click', props.handleClick);
	});

	return (
		<div className="card" onClick={props.handleClick}>
			<img src={imgUrl} alt={name} />
			<p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
		</div>
	)
}

export default Card;