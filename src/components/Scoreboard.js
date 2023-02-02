import React from 'react';

function Scoreboard(props) {
	return (
		<div>
			<p>Lv. {props.level}</p>
			<p>Score: {props.score}</p>
			<p>Best: {props.bestScore}</p>
		</div>
	)
}

export default Scoreboard;