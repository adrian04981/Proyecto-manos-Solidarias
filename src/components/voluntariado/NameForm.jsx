import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebase';
import { ref, push, serverTimestamp, get, set } from 'firebase/database';

const NameForm = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        // Referencia al contador
        const counterRef = ref(database, 'registro_voluntarios/contador');
        
        // Obtener el valor actual del contador
        const counterSnapshot = await get(counterRef);
        const currentCount = counterSnapshot.exists() ? counterSnapshot.val() : 0;
        
        // Incrementar el contador
        await set(counterRef, currentCount + 1);
        
        // Guardar el nuevo registro
        const registrosRef = ref(database, 'registro_voluntarios/personas');
        await push(registrosRef, {
          nombre: name,
          timestamp: serverTimestamp(),
          numeroRegistro: currentCount + 1
        });

        navigate(`/voluntariado/preview/${name}`);
      } catch (error) {
        console.error("Error al guardar en la base de datos:", error);
        // Continuar con la navegación incluso si hay error en el registro
        navigate(`/voluntariado/preview/${name}`);
      }
    }
  };

  return (
    <div style={{ padding: '20px', marginTop: '10px', textAlign: 'center', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
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
        />

        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img
            type="submit"
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
