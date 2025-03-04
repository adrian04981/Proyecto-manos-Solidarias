import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { ref, onValue, remove, update } from 'firebase/database';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const MonitorDonaciones = () => {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState([]);
  const [stats, setStats] = useState({
    totalDonaciones: 0,
    equiposTecnologicos: 0,
    materialesConstruccion: 0,
    mobiliarioEscolar: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const registrosRef = ref(database, 'registro_donaciones');
    const unsubscribe = onValue(registrosRef, (snapshot) => {
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
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `registro_donaciones/${id}`));
      setDeleteModalOpen(false);
      setSelectedDonation(null);
    } catch (error) {
      alert('Error al eliminar la donación');
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (!editData || !selectedDonation) return;
    
    try {
      await update(ref(database, `registro_donaciones/${selectedDonation.id}`), {
        ...selectedDonation,
        ...editData,
      });
      setEditModalOpen(false);
      setSelectedDonation(null);
      setEditData(null);
    } catch (error) {
      alert('Error al actualizar la donación');
      console.error(error);
    }
  };

  const openDeleteModal = (donation) => {
    setSelectedDonation(donation);
    setDeleteModalOpen(true);
  };

  const openEditModal = (donation) => {
    setSelectedDonation(donation);
    setEditData({
      nombre: donation.nombre,
      tipos: { ...donation.tipos }
    });
    setEditModalOpen(true);
  };

  const handleGenerateCertificate = (nombre) => {
    // Abrir en nueva pestaña
    window.open(`/donacion/preview/${nombre}`, '_blank');
  };

  return (
    <div style={containerStyle}>
      {isLoading && <Loading />}
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
              <th style={tableHeaderStyle}>Acciones</th>
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
                <td style={actionsCellStyle}>
                  <button
                    onClick={() => handleGenerateCertificate(registro.nombre)}
                    style={certificateButtonStyle}
                    title="Ver Certificado en nueva pestaña"
                  >
                    📜
                  </button>
                  <button
                    onClick={() => openEditModal(registro)}
                    style={editButtonStyle}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => openDeleteModal(registro)}
                    style={deleteButtonStyle}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Confirmar Eliminación</h3>
            <p>¿Está seguro que desea eliminar la donación de {selectedDonation?.nombre}?</p>
            <div style={modalButtonsStyle}>
              <button
                onClick={() => setDeleteModalOpen(false)}
                style={cancelButtonStyle}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(selectedDonation.id)}
                style={confirmDeleteButtonStyle}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3 style={modalTitleStyle}>Editar Donación</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
              <input
                type="text"
                value={editData.nombre}
                onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                style={inputStyle}
              />
              <div style={checkboxGroupStyle}>
                {Object.entries(editData.tipos).map(([key, value]) => (
                  <label key={key} style={checkboxLabelStyle}>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setEditData({
                        ...editData,
                        tipos: {
                          ...editData.tipos,
                          [key]: !value
                        }
                      })}
                    />
                    {key === 'equiposTecnologicos' ? 'Equipos Tecnológicos' :
                     key === 'materialesConstruccion' ? 'Materiales de Construcción' :
                     'Mobiliario Escolar'}
                  </label>
                ))}
              </div>
              <div style={modalButtonsStyle}>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  style={cancelButtonStyle}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={confirmEditButtonStyle}
                >
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

const actionsCellStyle = {
  display: 'flex',
  gap: '10px',
  padding: '16px'
};

const buttonBaseStyle = {
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '1rem'
};

const editButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#ffd700',
};

const deleteButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#ff6b6b',
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
  maxWidth: '500px'
};

const modalTitleStyle = {
  margin: '0 0 20px 0',
  color: '#333'
};

const modalButtonsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px'
};

const confirmDeleteButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#ff6b6b',
  color: 'white',
  padding: '8px 16px'
};

const confirmEditButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '8px 16px'
};

const cancelButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#f0f0f0',
  padding: '8px 16px'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '16px',
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
  gap: '8px'
};

const certificateButtonStyle = {
  ...buttonBaseStyle,
  backgroundColor: '#4CAF50',
  fontSize: '1.2rem',
  padding: '8px 12px'
};

export default MonitorDonaciones;
