import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TopicSelection from './pages/TopicSelection';
import LessonView from './pages/LessonView';
import QuestionView from './pages/QuestionView';
import LessonComplete from './pages/LessonComplete';
import Play from './pages/Play';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<TopicSelection />} />
          <Route path="/topic/:topicId" element={<LessonView />} />
          <Route path="/topic/:topicId/lesson/:lessonId/questions" element={<QuestionView />} />
          <Route path="/topic/:topicId/complete" element={<LessonComplete />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;