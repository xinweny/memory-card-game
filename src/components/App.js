import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './Header';
import Game from './Game';
import Footer from './Footer';

import '../styles/App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <Game />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
