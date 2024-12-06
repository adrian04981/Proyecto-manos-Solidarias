import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import regresar from '@/assets/botón_regresar.png';
import descargar from '@/assets/descargar.webp';
import compartir from '@/assets/compartir.webp';
import './Preview.css';

const Preview = () => {
  const { name } = useParams();
  const navigate = useNavigate(); // Hook para manejar navegación
  const previewRef = useRef();

  const handleDownload = async () => {
    const container = document.createElement('div');
    container.style.width = '2480px'; // Tamaño A4
    container.style.height = '3508px';
    container.style.backgroundImage = `url(/src/assets/CertificadoManosSolidarias.png)`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.position = 'relative'; // Necesario para posicionar el texto
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    // Texto posicionado dentro del contenedor
    const textElement = document.createElement('span');
    textElement.innerText = name;
    textElement.style.position = 'absolute';
    textElement.style.bottom = '390px'; // Ajustar según el diseño
    textElement.style.left = '50%';
    textElement.style.transform = 'translateX(-50%)';
    textElement.style.color = 'white'; // Cambiar según fondo
    textElement.style.fontWeight = 'bold';
    textElement.style.fontSize = '75px';
    textElement.style.whiteSpace = 'nowrap';

    container.appendChild(textElement);

    document.body.appendChild(container);

    const canvas = await html2canvas(container, { scale: 2 });
    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    document.body.removeChild(container);
  };

  const handleShare = async () => {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    const file = new File([blob], `${name}.png`, { type: 'image/png' });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Certificado',
          text: `Aquí está tu certificado: ${name}`,
          files: [file],
        });
      } catch (error) {
        alert('No se pudo compartir la imagen.');
      }
    } else {
      alert('La funcionalidad para compartir no está disponible en este navegador.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Botón para regresar al menú */}
      <img
        src={regresar}
        alt="Botón regresar"
        style={{
          marginTop: '30px',
          width: '230px',
          height: '70px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => navigate('/')} // Navegar al menú principal
      />
      <div
        ref={previewRef}
        style={{
          width: '800px',
          height: '500px',
          backgroundImage: `url(/src/assets/Certificado_Manos_Solidarias.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto',
          display: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          maxWidth: '40%', // Adaptación estética
          maxHeight: '70vh', // Adaptación estética
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', // Sombra ligera
          position: 'relative', // Necesario para usar posicionamiento absoluto dentro
        }}
      >
        {/* Nombre del usuario */}
        <span class = "elnombre"
        >
          {name}
        </span>
      </div>
      {/* Botón para descargar */}
      <div style={{ marginBottom: '20px' }}></div>
      <img
        src={descargar}
        alt="Botón descargar"
        style={{ width: '200px', height: '50px', cursor: 'pointer', marginBottom: '40px' }}
        onClick={handleDownload} // Llama a la función para descargar
      />
      {/* Botón para compartir */}
      <img
        src={compartir}
        alt="Botón compartir"
        style={{ width: '200px', height: '50px', cursor: 'pointer', marginBottom: '40px' }}
        onClick={handleShare} // Llama a la función para compartir
      />
    </div>
  );
};

export default Preview;