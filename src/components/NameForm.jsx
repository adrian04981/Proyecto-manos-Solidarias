import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bsf from '@/assets/Logo-bsf-en-blanco.webp';
import texto from '@/assets/Texto -Crea tu tarjeta de Navidad- vertical.png'
import continuar from '@/assets/Botón continuar.png'
const NameForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handlePreview = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/preview/${name}`);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <img src={texto} style={{ width: '100%', maxWidth: '400px', height: 'auto' }} alt="Texto Crea tu tarjeta de Navidad" />
      <form onSubmit={handlePreview}>
        <input
          type="text"
          placeholder="Escribe tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', textAlign: 'center', opacity: '0.7', width: '100%', maxWidth: '300px' }}
        />
        <div style={{ padding: '20px' }} />
        <button style={{ background: 'none', border: 'none', padding: 0 }}>
          <img type="submit" src={continuar} alt="BSF Logo" style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
        </button>
      </form>
      <img src={bsf} alt="BSF Logo" style={{ width: '200px', height: 'auto', marginTop: '20px', borderRadius: '8px' }} />
    </div>
  );
};

export default NameForm;