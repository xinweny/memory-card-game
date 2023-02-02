import React, { useState, useEffect } from 'react';

import Scoreboard from './Scoreboard';
import CardDisplay from './CardDisplay';

import '../styles/Game.css';

function Game() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [pokemons, setPokemons] = useState([]);
	const [clickedIds, setClickedIds] = useState([]);

	const shuffleArray = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/pokemon?limit=10') // limit=1008
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
		} else {
			setClickedIds([]);
			setScore(0);
		}

		setPokemons(shuffleArray([...pokemons]));
	}

	return (
		<div className="game">
			<Scoreboard score={score} bestScore={bestScore} />
			<CardDisplay pokemons={pokemons} handleClick={updateGame} />
		</div>
	)
}

export default Game;