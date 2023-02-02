import React, { useState } from 'react';

import Scoreboard from './Scoreboard';
import CardDisplay from './CardDisplay';

function Game() {
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	return (
		<div>
			<Scoreboard score={score} bestScore={bestScore} />
			<CardDisplay />
		</div>
	)
}

export default Game;