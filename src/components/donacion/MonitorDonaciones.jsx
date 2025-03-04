import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const MonitorDonaciones = () => {
  const [registros, setRegistros] = useState([]);
  const [stats, setStats] = useState({
    totalDonaciones: 0,
    equiposTecnologicos: 0,
    materialesConstruccion: 0,
    mobiliarioEscolar: 0
  });

  useEffect(() => {
    const registrosRef = ref(database, 'registro_donaciones');
    onValue(registrosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const registrosArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          fecha: new Date(value.fecha).toLocaleString()
        }));
        
        // Ordenar por fecha (más reciente primero)
        registrosArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setRegistros(registrosArray);

        // Calcular estadísticas
        const newStats = {
          totalDonaciones: registrosArray.length,
          equiposTecnologicos: registrosArray.filter(r => r.tipos.equiposTecnologicos).length,
          materialesConstruccion: registrosArray.filter(r => r.tipos.materialesConstruccion).length,
          mobiliarioEscolar: registrosArray.filter(r => r.tipos.mobiliarioEscolar).length
        };
        setStats(newStats);
      }
    });
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Monitor de Donaciones</h1>
      
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <h3>Total Donaciones</h3>
          <p>{stats.totalDonaciones}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Equipos Tecnológicos</h3>
          <p>{stats.equiposTecnologicos}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Materiales de Construcción</h3>
          <p>{stats.materialesConstruccion}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Mobiliario Escolar</h3>
          <p>{stats.mobiliarioEscolar}</p>
        </div>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Nombre</th>
              <th style={tableHeaderStyle}>Tipos de Donación</th>
              <th style={tableHeaderStyle}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td style={tableCellStyle}>{registro.nombre}</td>
                <td style={tableCellStyle}>
                  {Object.entries(registro.tipos)
                    .filter(([_, value]) => value)
                    .map(([key, _]) => ({
                      equiposTecnologicos: 'Equipos Tecnológicos',
                      materialesConstruccion: 'Materiales de Construcción',
                      mobiliarioEscolar: 'Mobiliario Escolar'
                    }[key]))
                    .join(', ')}
                </td>
                <td style={tableCellStyle}>{registro.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '40px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
  textAlign: 'center',
  color: '#000',
  fontSize: '2rem',
  marginBottom: '40px'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '40px'
};

const statCardStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const tableContainerStyle = {
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const tableHeaderStyle = {
  padding: '16px',
  textAlign: 'left',
  borderBottom: '1px solid #eee',
  fontWeight: '500'
};

const tableCellStyle = {
  padding: '16px',
  borderBottom: '1px solid #eee'
};

export default MonitorDonaciones;
