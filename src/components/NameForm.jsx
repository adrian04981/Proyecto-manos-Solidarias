import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import bsf from '@/assets/Logo-bsf-en-blanco.webp';
import texto from '@/assets/texto registra tu donación.png';
import continuar from '@/assets/Botón continuar.png';

// Importa la configuración de Firebase
import { app } from '@/firebase';

const NameForm = () => {
  const [name, setName] = useState(''); // Almacena el nombre ingresado por el usuario
  const [counter, setCounter] = useState(0); // Estado para el valor del contador
  const navigate = useNavigate();
  const database = getDatabase(app); // Obtén la instancia de Realtime Database

  // Listener para el contador en Firebase
  useEffect(() => {
    const counterRef = ref(database, 'counter'); // Referencia al nodo 'counter' en la base de datos

    // Escucha los cambios en el valor del contador
    const unsubscribe = onValue(counterRef, (snapshot) => {
      if (snapshot.exists()) {
        setCounter(snapshot.val()); // Actualiza el estado local con el valor del contador
      } else {
        setCounter(0); // Si no existe, inicializa en 0
      }
    });

    // Limpia el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, [database]);

  // Incrementa el contador en Firebase
  const incrementCounter = async () => {
    const counterRef = ref(database, 'counter'); // Referencia al nodo 'counter'
    try {
      const snapshot = await get(counterRef);
      const currentCount = snapshot.exists() ? snapshot.val() : 0;

      // Actualiza el contador incrementándolo en 1
      await set(counterRef, currentCount + 1);
      console.log(`El contador se ha actualizado a: ${currentCount + 1}`);
    } catch (error) {
      console.error("Error al actualizar el contador:", error);
    }
  };

  // Maneja el envío del formulario
  const handlePreview = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      await incrementCounter(); // Incrementa el contador antes de la navegación
      navigate(`/preview/${name}`); // Navega a la ruta con el nombre ingresado
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      {/* Imagen superior */}
      <img
        src={texto}
        style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
        alt="Texto Crea tu tarjeta de Navidad"
      />
      
      {/* Mostrar el contador */}
      <p style={{ fontSize: '18px', margin: '10px 0' }}>
        El botón ha sido presionado <strong>{counter}</strong> veces.
      </p>

      {/* Formulario */}
      <form onSubmit={handlePreview}>
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
        <div style={{ padding: '20px' }} />
        
        {/* Botón continuar */}
        <button style={{ background: 'none', border: 'none', padding: 0 }}>
          <img
            type="submit"
            src={continuar}
            alt="Botón Continuar"
            style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
          />
        </button>
      </form>

      {/* Imagen inferior */}
      <img
        src={bsf}
        alt="BSF Logo"
        style={{ width: '200px', height: 'auto', marginTop: '20px', borderRadius: '8px' }}
      />
    </div>
  );
};

export default NameForm;