import React from 'react';

import '../styles/Scoreboard.css';

function Scoreboard(props) {
	return (
		<div className="scoreboard pokemon-border">
			<div className="game-info">
				<p className="level">Lv. {props.level}</p>
				<p className="score">Score: {props.score} / {props.numCards < props.initN ? props.initN : props.numCards}</p>
				<p className="best-level">Best: {props.bestLevel}</p>
			</div>
			<i></i>
		</div>
	)
}

export default Scoreboard;