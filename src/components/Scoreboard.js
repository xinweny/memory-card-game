import React from 'react';

function Scoreboard(props) {
	return (
		<div>
			<p>Lv. {props.level}</p>
			<p>
				{(props.numCards <= 1 ? 0 : props.numCards)} / {props.limit}
			</p>
			<p>Score: {props.score}</p>
			<p>Best: {props.bestScore}</p>
		</div>
	)
}

export default Scoreboard;