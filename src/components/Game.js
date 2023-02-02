import React, { useState, useEffect } from 'react';

import Scoreboard from './Scoreboard';
import CardDisplay from './CardDisplay';

function Game() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon?limit=10') // limit=1008
			.then(response => response.json())
			.then(async data => {
				const pokemonData = [];

				for (const d of data.results) {
					const res = await fetch(d.url);
					const pokemon = await res.json();

					pokemonData.push({
						id: pokemon.id,
						name: pokemon.name,
						imgUrl: pokemon.sprites.other['official-artwork']['front_default'],
						isClicked: false,
					});
				}

				setPokemons(pokemonData);
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

	return (
		<div>
			<Scoreboard score={score} bestScore={bestScore} />
			<CardDisplay pokemons={pokemons} />
		</div>
	)
}

export default Game;