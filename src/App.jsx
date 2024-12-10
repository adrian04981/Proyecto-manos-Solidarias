import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NameForm from './components/NameForm';
import Preview from './components/Preview';

const App = () => {
  return (
    <div
      className="app-background"
      style={{
        backgroundImage: window.innerWidth >= 1024 
          ? `url('https://appbsf.blob.core.windows.net/navidad/Fondo_Version_escritorio.webp')` 
          : `url('/src/assets/Fondo_Version_9x16.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Routes>
        <Route path="/" element={<NameForm />} />
        <Route path="/preview/:name" element={<Preview />} />
      </Routes>
    </div>
  );
};

export default App;