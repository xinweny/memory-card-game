import React from 'react';

import Card from './Card';

import '../styles/CardDisplay.css';

function CardDisplay(props) {
	return (
		<div className="card-display">
			<div className="cards">
			{props.pokemons.map(pokemon => 
				<Card
				key={pokemon.id} name={pokemon.name} url={pokemon.imgUrl}
				handleClick={() => props.handleClick(pokemon.id)}
				/>
			)}
			</div>
		</div>
	)
}

export default CardDisplay;