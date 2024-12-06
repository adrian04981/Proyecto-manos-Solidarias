import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NameForm from './components/NameForm';
import Preview from './components/Preview';
import Generate from './components/Generate';
import './App.css';

const App = () => {
  return (
    <div className="app-background">
      <Routes>
        <Route path="/" element={<NameForm />} />
        <Route path="/preview/:name" element={<Preview />} />
        <Route path="/generate/:name" element={<Generate />} />
      </Routes>
    </div>
  );
};

export default App;