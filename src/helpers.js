export const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

export const chooseRandomElements = (arr, num = 1) => {
	const arrCopy = [...arr];
	const res = [];

	for (let i = 0; i < num; i++) {
		const index = Math.floor(Math.random() * arrCopy.length);

		if (res.indexOf(arrCopy[index]) !== -1) continue;

		res.push(arrCopy[index]);
		arrCopy.splice(index, 1); 
	}

	return res;
};

export const fetchPokemonData = async limit => {
	const pokemonData = [];

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`) // limit=905
	const data = await response.json();

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

		return pokemonData;
	}