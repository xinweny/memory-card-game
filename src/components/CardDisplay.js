import React from 'react';

import Card from './Card';

import '../styles/CardDisplay.css';

function CardDisplay(props) {
	return (
		<div className="card-display">
			{props.pokemons.map(pokemon => 
				<Card
				key={pokemon.id} pokemon={pokemon}
				handleClick={() => props.handleClick(pokemon.id)}
				/>
			)}
		</div>
	)
}

export default CardDisplay;