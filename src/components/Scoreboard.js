import React from 'react';

import '../styles/Scoreboard.css';

import aButtonSound from '../assets/a_button.mp3';

import speakerMutedSrc from '../assets/speaker_muted.png';
import speakerUnmutedSrc from '../assets/speaker_unmuted.png';
import resetButtonSrc from '../assets/reset_button.png';

function Scoreboard({
	level,
	score,
	numCards,
	initN,
	bestLevel,
	isMuted,
	toggleSound,
	restartGame,
}) {
	return (
		<div className="scoreboard pokemon-border">
			<div className="game-info">
				<span className="level">{`Lv. ${level}`}</span>
				<span className="score">{`Score: ${score} / ${numCards < initN ? initN : numCards}`}</span>
				<span className="best-level">{`Best: ${bestLevel}`}</span>
			</div>
			<i></i>
			<div className="options">
				<button onClick={() => { toggleSound(); }}>
					<img src={isMuted ? speakerMutedSrc : speakerUnmutedSrc} />
				</button>
				<button onClick={() => {
					if (!isMuted) new Audio(aButtonSound).play();
					restartGame();
				}}>
					<img src={resetButtonSrc} />
				</button>
			</div>
		</div>
	)
}

export default Scoreboard;