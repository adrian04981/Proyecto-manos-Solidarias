import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebase';
import { ref, push, get } from 'firebase/database';

const NameForm = () => {
  const [name, setName] = useState('');
  const [donationTypes, setDonationTypes] = useState({
    equiposTecnologicos: false,
    materialesConstruccion: false,
    mobiliarioEscolar: false
  });
  const [stats, setStats] = useState({
    totalDonaciones: 0,
    equiposTecnologicos: 0,
    materialesConstruccion: 0,
    mobiliarioEscolar: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar estadísticas al montar el componente
    const fetchStats = async () => {
      const statsRef = ref(database, 'registro_donaciones');
      const snapshot = await get(statsRef);
      if (snapshot.exists()) {
        const donations = Object.values(snapshot.val());
        const newStats = {
          totalDonaciones: donations.length,
          equiposTecnologicos: donations.filter(d => d.tipos.equiposTecnologicos).length,
          materialesConstruccion: donations.filter(d => d.tipos.materialesConstruccion).length,
          mobiliarioEscolar: donations.filter(d => d.tipos.mobiliarioEscolar).length
        };
        setStats(newStats);
      }
    };
    fetchStats();
  }, []);

  const handleDonationTypeChange = (type) => {
    setDonationTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    
    // Verificar que al menos un tipo de donación esté seleccionado
    if (!Object.values(donationTypes).some(type => type)) {
      alert('Por favor seleccione al menos un tipo de donación');
      return;
    }

    // Registrar la donación en Firebase
    const donacionRef = ref(database, 'registro_donaciones');
    await push(donacionRef, {
      nombre: name,
      tipos: donationTypes,
      fecha: new Date().toISOString()
    });

    navigate(`/donacion/preview/${name}`);
  };

  const DonationTypeButton = ({ type, label }) => (
    <button
      onClick={() => handleDonationTypeChange(type)}
      style={{
        padding: '10px 20px',
        margin: '5px',
        borderRadius: '8px',
        border: '2px solid #fff',
        background: donationTypes[type] ? '#4CAF50' : '#666',
        color: 'white',
        cursor: 'pointer',
        width: '300px',
        transition: 'all 0.3s ease'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: '20px', marginTop: '10px', textAlign: 'center', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <img
        src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Titular%20de%20la%20campana%20-Logo.png"
        style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
        alt="Header Logo"
      />
      <img
        src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Titular.png"
        style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
        alt="Texto Registra tu donación"
      />

      <form onSubmit={handleContinue} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
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
          required
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <h3 style={{ color: 'black' }}>Tipo de Donación </h3>
          <DonationTypeButton 
            type="equiposTecnologicos" 
            label="Equipos Tecnológicos" 
          />
          <DonationTypeButton 
            type="materialesConstruccion" 
            label="Materiales de Construcción y Mantenimiento" 
          />
          <DonationTypeButton 
            type="mobiliarioEscolar" 
            label="Mobiliario Escolar" 
          />
        </div>

        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginTop: '20px' }}>
          <img
            src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Boton%20Continuar.png"
            alt="Botón Continuar"
            style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
          />
        </button>
      </form>

      <img
        src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Pie%20de%20pagina.png"
        alt="BSF Logo"
        style={{ width: '500px', height: 'auto', borderRadius: '8px' }}
      />
    </div>
  );
};

export default NameForm;
