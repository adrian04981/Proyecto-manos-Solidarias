import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    navigate(`/preview/${name}`);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <img
        src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Titular.png"
        style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
        alt="Texto Registra tu donación"
      />

      <form onSubmit={handleContinue}>
        <input
          type="text"
          placeholder="Escribe tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            textAlign: 'center',
            opacity: '0.7',
            width: '100%',
            maxWidth: '300px',
          }}
        />

        <button style={{ background: 'none', border: 'none', padding: 0, marginTop: '20px' }}>
          <img
            type="submit"
            src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Boton%20Continuar.png"
            alt="Botón Continuar"
            style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
          />
        </button>
      </form>

      <img
        src="https://appbsf.blob.core.windows.net/navidad/Logo-bsf-en-blanco.webp"
        alt="BSF Logo"
        style={{ width: '200px', height: 'auto', marginTop: '20px', borderRadius: '8px' }}
      />
    </div>
  );
};

export default NameForm;
