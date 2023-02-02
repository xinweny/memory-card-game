import React from 'react';

import '../styles/Scoreboard.css';

function Scoreboard(props) {
	return (
		<div className="scoreboard">
			<p className="level">Lv. {props.level}</p>
			<p className="best-level">Best: {props.bestLevel}</p>
			<p className="score">Score: {props.score} / {props.numCards}</p>
		</div>
	)
}

export default Scoreboard;