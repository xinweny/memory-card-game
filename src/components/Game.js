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

import aButtonSound from '../assets/a_button.mp3';
import levelUpSound from '../assets/level_up.mp3';
import wallBumpSound from '../assets/wall_bump.mp3';

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
	}, [allPokemon]);

	useEffect(() => {
		if (!allPokemon) return;

		if (level === 1) {
			setPokemons(chooseRandomElements(allPokemon, initN.current));
		} else {
			const remaining = allPokemon.filter(pokemon => !(pokemons.map(p => p.id).includes(pokemon.id)));

			const nextPokemon = remaining[Math.floor(Math.random() * remaining.length)];

			setPokemons(prev => [...prev, nextPokemon]);
		}

		setClickedIds([]);

		if (level > bestLevel) setBestLevel(level);
	}, [level, allPokemon]);

	const startGame = i => {
		new Audio(aButtonSound).play();
		setGeneration(i + 1);
	};

	const updateGame = id => {
		if (clickedIds.includes(id)) {
			new Audio(wallBumpSound).play();
			setClickedIds([]);
			setScore(0);
			setLevel(1);
			setPokemons([]);
			setGeneration(0);
		} else if (pokemons.length === [...clickedIds, id].length) {
			new Audio(levelUpSound).play();
			setLevel(prevLevel => prevLevel + 1);
			setClickedIds([]);
			setScore(0);
		} else {
			new Audio(aButtonSound).play();
			setClickedIds(prevIds => [...prevIds, id]);
			setScore(prevScore => prevScore + 1);
			setPokemons(pokemons => shuffleArray([...pokemons]));
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
							startGame={startGame}
						/>
						: <LoadingScreen progress={loadingProgress} />
					}
				</div>
				: <CardDisplay
					pokemons={pokemons}
					updateGame={updateGame}
				/>
			}
		</div>
	)
}

export default Game;