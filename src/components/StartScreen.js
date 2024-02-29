import React from 'react';

import '../styles/StartScreen.css';

function StartScreen({ generations, startGame }) {
	return (
		<div className="start-modal pokemon-border">
      <div>
        <h3>INSTRUCTIONS</h3>
        <span>
          <span>Select each Pokémon ONCE per level.</span>
          <br />
          <span><span className="text-positive">LEVEL UP</span> when you select all Pokémon for that level.</span>
          <br />
          <span><span className="text-danger">GAME OVER</span> when you select a Pokémon twice for that level.</span>
        </span>
      </div>
      <div>
        <h3>SELECT GEN</h3>
        <div className="gen-buttons">
          {generations && generations.map((gen, i) => (
            <button key={gen} onClick={() => { startGame(i); }}>
              {gen}
            </button>
          ))}
        </div>
      </div>
		</div>
	);
}

export default StartScreen;