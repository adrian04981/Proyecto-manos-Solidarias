import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const MonitorRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Escuchar cambios en el contador
    const counterRef = ref(database, 'registro_voluntarios/contador');
    onValue(counterRef, (snapshot) => {
      setContador(snapshot.val() || 0);
    });

    // Escuchar cambios en los registros
    const registrosRef = ref(database, 'registro_voluntarios/personas');
    onValue(registrosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const registrosArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          timestamp: value.timestamp ? new Date(value.timestamp).toLocaleString() : 'Sin fecha'
        }));
        // Ordenar por número de registro (más reciente primero)
        registrosArray.sort((a, b) => b.numeroRegistro - a.numeroRegistro);
        setRegistros(registrosArray);
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#fff', marginBottom: '30px' }}>
        Monitor de Registros
      </h1>
      
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#fff', textAlign: 'center' }}>
          Total de Registros: {contador}
        </h2>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        overflowX: 'auto' 
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          color: '#fff'
        }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>N°</th>
              <th style={tableHeaderStyle}>Nombre</th>
              <th style={tableHeaderStyle}>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td style={tableCellStyle}>{registro.numeroRegistro}</td>
                <td style={tableCellStyle}>{registro.nombre}</td>
                <td style={tableCellStyle}>{registro.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
};

export default MonitorRegistros;
