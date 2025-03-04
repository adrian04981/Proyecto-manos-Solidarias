import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import Loading from '../Loading';

const MonitorRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [contador, setContador] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const counterRef = ref(database, 'registro_voluntarios/contador');
    const registrosRef = ref(database, 'registro_voluntarios/personas');

    const unsubscribeCounter = onValue(counterRef, (snapshot) => {
      setContador(snapshot.val() || 0);
    });

    const unsubscribeRegistros = onValue(registrosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const registrosArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
          timestamp: value.timestamp ? new Date(value.timestamp).toLocaleString() : 'Sin fecha'
        }));
        registrosArray.sort((a, b) => b.numeroRegistro - a.numeroRegistro);
        setRegistros(registrosArray);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribeCounter();
      unsubscribeRegistros();
    };
  }, []);

  return (
    <div style={containerStyle}>
      {isLoading && <Loading />}
      <h1 style={titleStyle}><strong>Monitor de Voluntariado</strong></h1>
      <div style={counterContainerStyle}>
        <h2 style={counterStyle}>
          Voluntarios totales registrados : <strong>{contador}</strong>
        </h2>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
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

const containerStyle = {
  padding: '40px 20px',
  maxWidth: '1000px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
  textAlign: 'center',
  color: '#000',
  fontSize: '2rem',
  marginBottom: '40px',
  fontWeight: '300'
};

const counterContainerStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '30px'
};

const counterStyle = {
  color: '#000',
  textAlign: 'center',
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: '400'
};

const tableContainerStyle = {
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  color: '#000'
};

const tableHeaderStyle = {
  padding: '16px',
  textAlign: 'left',
  borderBottom: '1px solid #eee',
  fontWeight: '500',
  fontSize: '0.9rem'
};

const tableCellStyle = {
  padding: '16px',
  borderBottom: '1px solid #eee',
  fontSize: '0.9rem'
};

export default MonitorRegistros;
