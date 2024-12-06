import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import certificadoFondo from '@/assets/CertificadoManosSolidarias.png'; // Ruta del fondo
import regresar from '@/assets/botón_regresar.png'; // Ruta para botón de regresar
import compartir from '@/assets/compartir.webp'; // Ruta para botón de compartir
import descarga from '@/assets/descargar.webp'; // Ruta para botón de descarga

const PreviewCertificate = () => {
  const { name } = useParams();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Configuración del tamaño A4 horizontal (en píxeles a 300 dpi)
    const width = 2480; // Ancho en píxeles
    const height = 3508; // Alto en píxeles
    canvas.width = width;
    canvas.height = height;

    // Cargar la imagen de fondo
    const background = new Image();
    background.src = certificadoFondo;
    background.onload = () => {
      // Dibujar la imagen de fondo
      ctx.drawImage(background, 0, 0, width, height);

      // Texto del certificado
      ctx.font = '200px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';

      // Nombre
      ctx.fillText(name, width / 2, 2230);
    };
  }, [name]);

  // Función para descargar la imagen como PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'certificado.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Función para regresar a la página anterior
  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  // Función para compartir en redes sociales
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Certificado',
        text: `¡Mira el certificado que he recibido!`,
        url: window.location.href, // Comparte la URL actual
      }).catch((error) => console.error('Error al compartir:', error));
    } else {
      alert('La función de compartir no está soportada en este navegador.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      transform: window.innerWidth <= 768 ? 'translateY(-50px)' : 'translateY(0)', // Mover todo 70px más arriba del centro en móviles
    }}>
      {/* Botón de regresar */}
      <img
        src={regresar}
        alt="Regresar"
        style={{
          width: '150px',
          height: 'auto',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={handleBack}
      />
      {/* Canvas para el certificado */}
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '20px',
          width: '380px',
          height: '480px', // Proporción A4
        }}
      />
      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <img
          src={compartir}
          alt="Compartir"
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleShare}
        />
        <img
          src={descarga}
          alt="Descargar"
          style={{
            width: '150px',
            height: 'auto',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleDownload} // Corrección: llama a handleDownload
        />
      </div>
    </div>
  );
};

export default PreviewCertificate;
