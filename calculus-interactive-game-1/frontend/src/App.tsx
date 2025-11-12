import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play" component={Play} />
          <Route path="/game" component={GameBoard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;