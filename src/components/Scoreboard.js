import React from 'react';

import '../styles/Scoreboard.css';

import speakerMutedSrc from '../assets/speaker_muted.png';
import speakerUnmutedSrc from '../assets/speaker_unmuted.png';

function Scoreboard({ level, score, numCards, initN, bestLevel, isMuted, toggleSound }) {
	return (
		<div className="scoreboard pokemon-border">
			<div className="game-info">
				<span className="level">{`Lv. ${level}`}</span>
				<span className="score">{`Score: ${score} / ${numCards < initN ? initN : numCards}`}</span>
				<span className="best-level">{`Best: ${bestLevel}`}</span>
			</div>
			<i></i>
			<div className="options">
				<button onClick={(() => { toggleSound(); })}>
					<img src={isMuted ? speakerMutedSrc : speakerUnmutedSrc} />
				</button>
				<button></button>
			</div>
		</div>
	)
}

export default Scoreboard;