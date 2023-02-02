import React from 'react';

function Scoreboard(props) {
	return (
		<div>
			<p>Lv. {props.level}</p>
			<p>Best: {props.bestLevel}</p>
			<p>Score: {props.score} / {props.numCards}</p>
		</div>
	)
}

export default Scoreboard;