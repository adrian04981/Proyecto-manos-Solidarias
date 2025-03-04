import React from 'react';
import MonitorRegistros from './voluntariado/MonitorRegistros';
import MonitorDonaciones from './donacion/MonitorDonaciones';

const Monitor = () => {
  return (
    <div style={containerStyle}>
      <h1 style={mainTitleStyle}>Panel General</h1>
      
      <div style={monitorsContainerStyle}>
        <div style={monitorWrapperStyle}>
          <MonitorRegistros />
        </div>
        <div style={monitorWrapperStyle}>
          <MonitorDonaciones />
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  width: '100%',
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh'
};

const mainTitleStyle = {
  textAlign: 'center',
  color: '#333',
  fontSize: '2.5rem',
  marginBottom: '30px',
  borderBottom: '2px solid #333',
  paddingBottom: '10px'
};

const monitorsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Changed to fixed two-column layout
  gap: '20px',
  padding: '20px',
  maxWidth: '100%',
  overflow: 'hidden'
};

const monitorWrapperStyle = {
  background: '#fff',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 150px)' // Added to ensure scrolling within each monitor
};

export default Monitor;
