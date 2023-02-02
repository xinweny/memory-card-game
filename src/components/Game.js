import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../helpers';

import Scoreboard from './Scoreboard';
import CardDisplay from './CardDisplay';
import LoadingScreen from './LoadingScreen';

import '../styles/Game.css';

function Game() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [level, setLevel] = useState(1);
	const [pokemons, setPokemons] = useState([]);
	const [clickedIds, setClickedIds] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon?limit=10') // limit=905
			.then(response => response.json())
			.then(async data => {
				const pokemonData = [];

				for (const d of data.results) {
					const res = await fetch(d.url);
					const pokemon = await res.json();

					const imgUrl = (pokemon.sprites.front_default) ? 
						pokemon.sprites.front_default :
						pokemon.sprites.other['official-artwork']['front_default'];

					pokemonData.push({
						id: pokemon.id,
						name: pokemon.name,
						imgUrl,
					});
				}

				setPokemons(shuffleArray(pokemonData));
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

	const updateGame = id => {
		if (!clickedIds.includes(id)) {
			setClickedIds([...clickedIds, id]);
			setScore(score + 1);
			if (score > bestScore) setBestScore(score);

			if (clickedIds.length === pokemons.length) {
				setLevel(level + 1);
			}
		} else {
			setClickedIds([]);
			setScore(0);
		}

		setPokemons(shuffleArray([...pokemons]));
	}

	return (
		<div className="game">
			<Scoreboard score={score} bestScore={bestScore} level={level} />
			{(isLoading) ?
				<LoadingScreen /> :
				<CardDisplay pokemons={pokemons} handleClick={updateGame} />}
		</div>
	)
}

export default Game;