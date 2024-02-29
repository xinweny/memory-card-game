import React from 'react';

import '../styles/StartScreen.css';

function StartScreen({ generations, setGeneration }) {
	return (
		<div className="start-modal pokemon-border">
      <div>
        <h1>INSTRUCTIONS</h1>
        <span>Select each Pokémon only ONCE per level. You will progress to the next level when all Pokémon have been selected once each. If you pick a Pokémon you already selected for that level, GAME OVER.</span>
      </div>
      <div>
        <h2>SELECT GEN</h2>
        <div>
          {generations && generations.map((gen, i) => (
            <button key={gen} onClick={() => { setGeneration(i + 1); }}>
              {gen}
            </button>
          ))}
        </div>
      </div>
		</div>
	);
}

export default StartScreen;