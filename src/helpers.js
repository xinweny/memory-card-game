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