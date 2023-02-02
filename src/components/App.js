import React from 'react';

import Header from './Header';
import Game from './Game';
import Footer from './Footer';

import '../styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
