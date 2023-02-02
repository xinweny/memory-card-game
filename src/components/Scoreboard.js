import React from 'react';

function Scoreboard(props) {
	return (
		<div>
			<p>Score: {props.score}</p>
			<p>Best: {props.bestScore}</p>
		</div>
	)
}

export default Scoreboard;