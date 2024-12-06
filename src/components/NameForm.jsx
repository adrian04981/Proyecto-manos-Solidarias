import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bsf from '@/assets/Logo-bsf-en-blanco.webp';
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
      <h1>CREA TU TARJETA DE NAVIDAD</h1>
      <form onSubmit={handlePreview}>
        <input
          type="text"
          placeholder="Escribe tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '8px', textAlign: 'center', opacity : '0.7' }}
        />
        <div style={{ padding: '20px' }}/>
        <button type="submit" style={{ padding: '20px 20px', color: 'green', fontSize: '30px', borderRadius: '8px',  fontFamily: 'Bookman Old Style', opacity:'0.9' }}>
          CONTINUAR
        </button>
      </form>
      
      <img src={bsf} alt="BSF Logo" style={{ width: '200px', height: 'auto', marginTop: '20px', borderRadius: '8px' }} />
    </div>
  );
};

export default NameForm;