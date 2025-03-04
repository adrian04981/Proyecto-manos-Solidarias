import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NameFormVoluntariado from './components/voluntariado/NameForm';
import PreviewVoluntariado from './components/voluntariado/Preview';
import NameFormDonacion from './components/donacion/NameForm';
import PreviewDonacion from './components/donacion/Preview';
import MonitorRegistros from './components/voluntariado/MonitorRegistros';
import MonitorDonaciones from './components/donacion/MonitorDonaciones';
import Monitor from './components/Monitor';

const App = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Remove margins and padding from body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  const getBackgroundImage = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('voluntariado')) {
      return 'https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Fondo.png';
    } else if (path.includes('donacion')) {
      return 'https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/donacion/Wallpaper.png';
    }
    return ''; // default background
  };

  return (
    <div
      className="app-background"
      style={{
        backgroundImage: `url('${getBackgroundImage()}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        margin: 0,
        padding: 0,
        overflow: 'auto'
      }}
    >
      <div style={{ 
        flex: 1, 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px 0'
      }}>
        <Routes>
          <Route path="/voluntariado" element={<NameFormVoluntariado />} />
          <Route path="/voluntariado/preview/:name" element={<PreviewVoluntariado />} />
          <Route path="/donacion" element={<NameFormDonacion />} />
          <Route path="/donacion/preview/:name" element={<PreviewDonacion />} />
          <Route path="/monitor" element={<Monitor />} />
        </Routes>
      </div>
      <img
        src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Cinta%20diferenciadora.png"
        alt="Footer Ribbon"
        style={{
          width: '100%',
          height: 'auto',
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
          display: 'block',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default App;