import React from 'react';

function Card(props) {
	const { name, imgUrl } = props.pokemon;

	return (
		<div>
			<img src={imgUrl} alt={name} />
			<p>{name}</p>
		</div>
	)
}

export default Card;