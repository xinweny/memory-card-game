import React, { useState, useEffect, useRef } from 'react';
import {
	shuffleArray,
	chooseRandomElements,
	fetchPokemonData, } from '../helpers';

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

	const allPokemon = useRef([]);
	const initN = useRef(4);

	useEffect(() => {
		fetchPokemonData(10)
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
			<Scoreboard score={score} bestScore={bestScore} level={level} />
			{(isLoading) ?
				<LoadingScreen /> :
				<CardDisplay
					pokemons={pokemons}
					handleClick={updateGame}
				/>
			}
		</div>
	)
}

export default Game;