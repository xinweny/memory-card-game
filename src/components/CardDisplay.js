import React from 'react';

import Card from './Card';

function CardDisplay(props) {
	return (
		<div>
			{props.pokemons.map(pokemon => 
				<Card key={pokemon.id} pokemon={pokemon} />
			)}
		</div>
	)
}

export default CardDisplay;