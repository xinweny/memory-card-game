import React from 'react';

import '../styles/Scoreboard.css';

function Scoreboard(props) {
	return (
		<div className="scoreboard pokemon-border">
			<div className="game-info">
				<span className="level">{`Lv. ${props.level}`}</span>
				<span className="score">{`Score: ${props.score} / ${props.numCards < props.initN ? props.initN : props.numCards}`}</span>
				<span className="best-level">{`Best: ${props.bestLevel}`}</span>
			</div>
			<i></i>
		</div>
	)
}

export default Scoreboard;