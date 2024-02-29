import React from 'react';

import Card from './Card';

import '../styles/CardDisplay.css';

function CardDisplay({ pokemons, handleClick }) {
	return (
		<div className="card-display">
			<div className="cards">
			{pokemons.map(pokemon => 
				<Card
					key={pokemon.id} name={pokemon.name} url={pokemon.imgUrl}
					handleClick={() => { handleClick(pokemon.id); }}
				/>
			)}
			</div>
		</div>
	)
}

export default CardDisplay;