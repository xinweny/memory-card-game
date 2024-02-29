import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	shuffleArray,
	chooseRandomElements,
} from '../helpers';

import StartScreen from './StartScreen';
import Scoreboard from './Scoreboard';
import CardDisplay from './CardDisplay';
import LoadingScreen from './LoadingScreen';

import '../styles/Game.css';

import levelUpSrc from '../assets/level_up.m4a';

const API_URL = 'https://pokeapi.co/api/v2';

function Game() {
	const [generation, setGeneration] = useState(0);
	const [score, setScore] = useState(0);
	const [level, setLevel] = useState(1);
	const [bestLevel, setBestLevel] = useState(1);
	const [pokemons, setPokemons] = useState([]);
	const [clickedIds, setClickedIds] = useState([]);
	const [loadingProgress, setLoadingProgress] = useState(0);

	const initN = useRef(3);

	const levelUpSound = new Audio(levelUpSrc);

	const { data: generations } = useQuery({
		queryKey: ['generation', generation],
		queryFn: () => fetch(`${API_URL}/generation`)
			.then(r => r.json())
			.then(data => data.results.map(r => r.name.split('-')[1].toUpperCase())),
	});

	const { data: range } = useQuery({
		queryKey: ['range', generation],
		queryFn: () => fetch(`${API_URL}/generation/${generation}`)
		.then(r => r.json())
		.then(data => {
			const dexNumbers = data.pokemon_species.map(s => Number(s.url.split('/').slice(-2)[0]));

			return [dexNumbers[0] - 1, dexNumbers.length];
		}),
		enabled: generation !== 0,
	});

	const { data: allPokemon } = useQuery({
		queryKey: ['pokemons', generation],
		queryFn: () => fetch(range ? `${API_URL}/pokemon?limit=${range[1]}&offset=${range[0]}` : '')
			.then(response => {
				setLoadingProgress(0);
				return response.json();
			})
			.then(async data => {
				const all = await Promise.all(data.results.map(d => fetch(d.url)
					.then(res => res.json())
					.then(pokemon => {
						const imgUrl = pokemon.sprites.front_default
							? pokemon.sprites.front_default
							: pokemon.sprites.other['official-artwork']['front_default'];

						return {
							id: pokemon.id,
							name: pokemon.species.name,
							imgUrl,
						};
					})
					.then(data => {
						setLoadingProgress(prev => prev + (100 / range[1]));
	
						return data;
					})));

				return all;
			}),
		enabled: !!range,
	});

	useEffect(() => {
		if (!allPokemon) return;

		setPokemons(chooseRandomElements(allPokemon, initN.current));
	}, [allPokemon]);

	useEffect(() => {
		if (clickedIds.length !== 0 && pokemons.length === clickedIds.length) {
			levelUpSound.play();
			setLevel(prevLevel => prevLevel + 1);
			setClickedIds([]);
			setScore(0);
		} else {
			setPokemons(pokemons => shuffleArray([...pokemons]));
		}
	}, [clickedIds]);

	useEffect(() => {
		if (!allPokemon) return;

		setPokemons(chooseRandomElements(allPokemon, initN.current + (level - 1)));
		setClickedIds([]);

		if (level > bestLevel) setBestLevel(level);

	}, [level, allPokemon]);

	const updateGame = id => {
		if (!clickedIds.includes(id)) {
			setClickedIds(prevIds => [...prevIds, id]);
			setScore(prevScore => prevScore + 1);
		} else {
			setClickedIds([]);
			setScore(0);
			setLevel(1);
			setPokemons([]);
			setGeneration(0);
		}
	};

	return (
		<div className="game">
			<Scoreboard
				score={score}
				level={level}
				bestLevel={bestLevel}
				numCards={pokemons.length}
				initN={initN.current}
			/>
			{pokemons.length === 0
				? <div className="screen">
					{generation === 0
						?	<StartScreen
							generations={generations}
							setGeneration={setGeneration}
						/>
						: <LoadingScreen progress={loadingProgress} />
					}
				</div>
				: <CardDisplay
					pokemons={pokemons}
					handleClick={updateGame}
				/>
			}
		</div>
	)
}

export default Game;