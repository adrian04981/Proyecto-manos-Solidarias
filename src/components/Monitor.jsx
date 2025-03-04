import React, { useState } from 'react';
import MonitorRegistros from './voluntariado/MonitorRegistros';
import MonitorDonaciones from './donacion/MonitorDonaciones';
import Loading from './Loading';
import { database } from '../firebase';
import { ref, push } from 'firebase/database';

const Monitor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donationData, setDonationData] = useState({
    nombre: '',
    tipos: {
      equiposTecnologicos: false,
      materialesConstruccion: false,
      mobiliarioEscolar: false
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donationData.nombre || !Object.values(donationData.tipos).some(type => type)) {
      alert('Por favor complete el nombre y seleccione al menos un tipo de donación');
      return;
    }

    setIsLoading(true);
    try {
      const donacionRef = ref(database, 'registro_donaciones');
      await push(donacionRef, {
        ...donationData,
        fecha: new Date().toISOString()
      });

      setDonationData({
        nombre: '',
        tipos: {
          equiposTecnologicos: false,
          materialesConstruccion: false,
          mobiliarioEscolar: false
        }
      });
      setIsModalOpen(false);
    } catch (error) {
      alert('Error al guardar la donación');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {isLoading && <Loading />}
      <div style={headerStyle}>
        <h1 style={mainTitleStyle}>Panel de Control</h1>
        <p style={subtitleStyle}>Monitoreo de Voluntarios y Donaciones</p>
      </div>
      
      <div style={monitorsContainerStyle}>
        <div style={monitorWrapperStyle}>
          <div style={monitorHeaderStyle}>
            <span style={indicatorStyle}></span>
            Registro de Voluntarios
          </div>
          <MonitorRegistros />
        </div>
        <div style={monitorWrapperStyle}>
          <div style={monitorHeaderStyle}>
            <span style={{...indicatorStyle, backgroundColor: '#4CAF50'}}></span>
            Registro de Donaciones
            <button 
              onClick={() => setIsModalOpen(true)}
              style={addButtonStyle}
            >
              + Agregar Donación
            </button>
          </div>
          <MonitorDonaciones />
        </div>
      </div>

      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={modalTitleStyle}>Registrar Nueva Donación</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
              <input
                type="text"
                placeholder="Nombre del donante"
                value={donationData.nombre}
                onChange={(e) => setDonationData({...donationData, nombre: e.target.value})}
                style={inputStyle}
              />
              
              <div style={checkboxGroupStyle}>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    checked={donationData.tipos.equiposTecnologicos}
                    onChange={() => setDonationData({
                      ...donationData,
                      tipos: {
                        ...donationData.tipos,
                        equiposTecnologicos: !donationData.tipos.equiposTecnologicos
                      }
                    })}
                  />
                  Equipos Tecnológicos
                </label>
                
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    checked={donationData.tipos.materialesConstruccion}
                    onChange={() => setDonationData({
                      ...donationData,
                      tipos: {
                        ...donationData.tipos,
                        materialesConstruccion: !donationData.tipos.materialesConstruccion
                      }
                    })}
                  />
                  Materiales de Construcción
                </label>
                
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    checked={donationData.tipos.mobiliarioEscolar}
                    onChange={() => setDonationData({
                      ...donationData,
                      tipos: {
                        ...donationData.tipos,
                        mobiliarioEscolar: !donationData.tipos.mobiliarioEscolar
                      }
                    })}
                  />
                  Mobiliario Escolar
                </label>
              </div>

              <div style={modalButtonsStyle}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={cancelButtonStyle}>
                  Cancelar
                </button>
                <button type="submit" style={submitButtonStyle}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '30px',
  width: '100%',
  margin: '0 auto',
  backgroundColor: '#f0f2f5',
  minHeight: '100vh',
  boxSizing: 'border-box'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const mainTitleStyle = {
  color: '#1a237e',
  fontSize: '2.8rem',
  marginBottom: '10px',
  fontWeight: '600',
  letterSpacing: '1px'
};

const subtitleStyle = {
  color: '#666',
  fontSize: '1.2rem',
  margin: '0',
  fontWeight: '400'
};

const monitorsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '30px',
  padding: '20px',
  maxWidth: '100%',
  overflow: 'hidden',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: '1fr',
  }
};

const monitorWrapperStyle = {
  background: '#fff',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 200px)',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'translateY(-5px)'
  }
};

const monitorHeaderStyle = {
  fontSize: '1.4rem',
  fontWeight: '500',
  color: '#333',
  marginBottom: '20px',
  paddingBottom: '15px',
  borderBottom: '2px solid #eee',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const indicatorStyle = {
  width: '12px',
  height: '12px',
  backgroundColor: '#1a237e',
  borderRadius: '50%',
  display: 'inline-block'
};

// Agregar estilos responsivos
const mediaQuery = window.matchMedia('(max-width: 1200px)');
if (mediaQuery.matches) {
  monitorsContainerStyle.gridTemplateColumns = '1fr';
}

const addButtonStyle = {
  marginLeft: 'auto',
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '500px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
};

const modalTitleStyle = {
  margin: '0 0 20px 0',
  color: '#333',
  fontSize: '1.5rem'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ddd'
};

const checkboxGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '1rem',
  color: '#333'
};

const modalButtonsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px'
};

const buttonBaseStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  border: 'none'
};

const cancelButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#f0f0f0',
  color: '#333'
};

const submitButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#4CAF50',
  color: 'white'
};

export default Monitor;
