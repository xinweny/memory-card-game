import React from 'react';

import '../styles/StartScreen.css';

function StartScreen({ generations, startGame }) {
	return (
		<div className="start-modal pokemon-border">
      <div>
        <h3>HOW TO PLAY</h3>
        <span>
          <span><span className="text-positive">LEVEL UP</span> when you select every Pokémon ONCE.</span>
          <br />
          <span><span className="text-danger">GAME OVER</span> when you select any Pokémon more than once.</span>
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