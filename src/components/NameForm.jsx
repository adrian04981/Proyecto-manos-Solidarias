import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { app } from '@/firebase';

const NameForm = () => {
  const [name, setName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    viveres: false,
    juguetes: false,
  });
  const [counters, setCounters] = useState({
    viveres: 0,
    juguetes: 0,
  });

  const navigate = useNavigate();
  const database = getDatabase(app);

  useEffect(() => {
    const fetchCounters = () => {
      const updates = ['viveres', 'juguetes'].map((type) => {
        const counterRef = ref(database, `contador_${type}`);
        return onValue(counterRef, (snapshot) => {
          setCounters((prev) => ({
            ...prev,
            [type]: snapshot.exists() ? snapshot.val() : 0,
          }));
        });
      });

      return () => updates.forEach((unsubscribe) => unsubscribe());
    };

    fetchCounters();
  }, [database]);

  const toggleSelection = (type) => {
    setSelectedOptions((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const incrementCounter = async (type) => {
    const counterRef = ref(database, `contador_${type}`);
    try {
      const snapshot = await get(counterRef);
      const currentCount = snapshot.exists() ? snapshot.val() : 0;
      await set(counterRef, currentCount + 1);
    } catch (error) {
      console.error(`Error al actualizar ${type}:`, error);
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    const selectedKeys = Object.keys(selectedOptions).filter((key) => selectedOptions[key]);

    if (selectedKeys.length === 0) {
      alert('Debe seleccionar al menos una opción (Víveres o Juguetes) para continuar.');
      return;
    }

    await Promise.all(selectedKeys.map(incrementCounter));
    navigate(`/preview/${name}`);
  };

  const renderOption = (type, color) => (
    <div
      onClick={() => toggleSelection(type)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '20px',
        border: selectedOptions[type] ? `2px solid ${color}` : '2px solid #ccc',
        borderRadius: '10px',
        width: '120px',
        backgroundColor: selectedOptions[type] ? `${color}20` : '#f9f9f9', // 20 for transparency
        transition: '0.3s ease',
      }}
    >
      <input
        type="checkbox"
        checked={selectedOptions[type]}
        onChange={() => toggleSelection(type)}
        style={{ display: 'none' }}
      />
      <span style={{ fontSize: '20px', fontWeight: 'bold', color }}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </div>
  );

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <img
        src="https://appbsf.blob.core.windows.net/navidad/texto registra tu donación.png"
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

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {renderOption('viveres', '#4CAF50')}
          {renderOption('juguetes', '#FF9800')}
        </div>

        <button style={{ background: 'none', border: 'none', padding: 0, marginTop: '20px' }}>
          <img
            type="submit"
            src="https://appbsf.blob.core.windows.net/navidad/Botón continuar.png"
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
