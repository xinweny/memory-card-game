import React, { useEffect } from 'react';

import '../styles/Card.css';

function Card(props) {
	useEffect(() => {
		return () => window.removeEventListener('click', props.handleClick);
	});

	let fName = props.name.split('-')[0];
	fName = fName.charAt(0).toUpperCase() + fName.slice(1)

	return (
		<div className="card" onClick={props.handleClick}>
			<img src={props.url} alt={props.name} />
			<p>{fName}</p>
		</div>
	)
}

export default Card;