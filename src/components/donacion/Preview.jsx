import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PreviewCertificate = () => {
  const { name } = useParams();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Convertir la imagen de Supabase a base64
  const getImageAsBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return base64;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Configuración del tamaño del canvas
    const width = 800;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // URL de la imagen de Supabase
    const backgroundImageURL = 'https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/donacion/Manos%20Solidarias%20-%20Inicio%20de%20clases%20-%20constancia%20de%20colaboracion.png';

    const loadImage = async () => {
      const base64Image = await getImageAsBase64(backgroundImageURL);
      const background = new Image();
      background.src = base64Image;
      background.onload = () => {
        // Dibujar el fondo
        ctx.drawImage(background, 0, 0, width, height);
        // Configuración del texto
        ctx.font = '30px Montserrat';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // Dibujar el nombre en mayúsculas
        const upperCaseName = name.toUpperCase();
        const maxWidth = 500; // Ancho máximo para el texto
        
        // Dividir el nombre en palabras
        const words = upperCaseName.split(' ');
        let lines = [];
        let currentLine = '';
        
        // Agrupar palabras en líneas
        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine !== '') {
          lines.push(currentLine);
          currentLine = word;
            } else {
          currentLine = testLine;
            }
        });
        if (currentLine) {
            lines.push(currentLine);
        }

        // Dibujar las líneas de texto
        const lineHeight = 45; // Reducido de 65 a 45 para menos espacio entre líneas
        const startY = 360 - ((lines.length - 1) * lineHeight / 2);
        lines.forEach((line, index) => {
            ctx.fillText(line, width / 2, startY + (index * lineHeight));
        });
      };
    };

    loadImage();
  }, [name]);

  // Descargar el certificado como PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    try {
      const link = document.createElement('a');
      link.download = `certificado_colaboracion_${name.replace(/ /g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error al descargar el certificado:', error);
      alert('No se puede descargar el certificado debido a un problema con la imagen.');
    }
  };

  // Regresar a la página anterior
  const handleBack = () => {
    navigate(-1);
  };

  // Compartir en redes sociales
  const handleShare = async () => {
    const canvas = canvasRef.current;
    const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

    if (navigator.share) {
      const file = new File([imageBlob], 'certificado.png', { type: 'image/png' });
      navigator.share({
        title: 'Certificado',
        text: '¡Mira el certificado que he recibido!',
        files: [file],
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
      minHeight: '50vh',
      textAlign: 'center',
      transform: window.innerWidth <= 768 ? 'translateY(-50px)' : 'translateY(0)',
      padding: '0px',
      marginTop: window.innerWidth <= 768 ? '100px' : '0',
    }}>
      {/* Botón para regresar */}
      <img
        src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Boton%20Regresar.png"
        alt="Regresar"
        style={{
          width: '250px',
          height: 'auto',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '10px',
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
          width: '500px',
          height: '500px',
        }}
      />

      {/* Botones para compartir y descargar */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <img
          src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Boton%20compartir.png"
          alt="Compartir"
          style={{
            width: '200px',
            height: 'auto',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleShare}
        />
        <img
          src="https://jifdifmiicpkhvkxvnfm.supabase.co/storage/v1/object/public/Manos-Solidarias/voluntariado/Boton%20descargar.png"
          alt="Descargar"
          style={{
            width: '200px',
            height: 'auto',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};

export default PreviewCertificate;