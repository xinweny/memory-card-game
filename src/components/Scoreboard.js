import React from 'react';

import '../styles/Scoreboard.css';

function Scoreboard({ level, score, numCards, initN, bestLevel }) {
	return (
		<div className="scoreboard pokemon-border">
			<div className="game-info">
				<span className="level">{`Lv. ${level}`}</span>
				<span className="score">{`Score: ${score} / ${numCards < initN ? initN : numCards}`}</span>
				<span className="best-level">{`Best: ${bestLevel}`}</span>
			</div>
			<i></i>
		</div>
	)
}

export default Scoreboard;