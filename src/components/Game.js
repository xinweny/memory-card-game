import React, { useState, useEffect, useRef } from 'react';
import {
	shuffleArray,
	chooseRandomElements,
} from '../helpers';

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
	const [loadingProgress, setLoadingProgress] = useState(0);

	const allPokemon = useRef([]);
	const initN = useRef(4);
	const limit = useRef(10);

	useEffect(() => {
		const pokemonData = [];

		fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit.current}`)
			.then(response => response.json())
			.then(async data => {
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

					const loadProgress = (pokemonData.length / data.results.length) * 100;
					setLoadingProgress(loadProgress);
				}
			
					return pokemonData;
			})// limit=905
			.then(data => {
				allPokemon.current = data;

				setIsLoading(false);
				setPokemons(
					chooseRandomElements(allPokemon.current, initN.current)
				);
			});
	}, []);

	useEffect(() => {
		if (clickedIds.length !== 0 && pokemons.length === clickedIds.length) {
			setLevel(prevLevel => prevLevel + 1);
			setClickedIds([]);
			setScore(0);
		} else {
			setPokemons(pokemons => shuffleArray([...pokemons]));
		}
	}, [clickedIds]);

	useEffect(() => {
		setPokemons(
			chooseRandomElements(allPokemon.current, initN.current + ((level - 1) * 2))
		);
		setClickedIds([]);
	}, [level])

	const updateGame = id => {
		if (!clickedIds.includes(id)) {
			setClickedIds(prevIds => [...prevIds, id]);
			setScore(prevScore => {
				const newScore = prevScore + 1;
				if (newScore > bestScore) setBestScore(newScore);
				return newScore;
			});
		} else {
			setClickedIds([]);
			setScore(0);
			setLevel(1);
		}
	}

	return (
		<div className="game">
			<Scoreboard
			score={score} bestScore={bestScore}
			level={level}
			numCards={pokemons.length}
			limit={limit.current}
			/>
			{(isLoading) ?
				<LoadingScreen progress={loadingProgress}/> :
				<CardDisplay
					pokemons={pokemons}
					handleClick={updateGame}
				/>
			}
		</div>
	)
}

export default Game;