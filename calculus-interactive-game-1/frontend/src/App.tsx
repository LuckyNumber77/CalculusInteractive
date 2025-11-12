import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import GameBoard from './components/GameBoard';
import HUD from './components/HUD';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <HUD />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/game" element={<GameBoard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;