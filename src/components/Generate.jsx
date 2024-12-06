import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Generate = () => {
  const { name } = useParams();

  useEffect(() => {
    const generateAndDownload = async () => {
      // Crear un contenedor invisible con las dimensiones A4
      const container = document.createElement('div');
      container.style.width = '210mm'; // Tamaño A4
      container.style.height = '297mm';
      container.style.backgroundImage = `url(/src/assets/Certificado_Manos_Solidarias.webp)`;
      container.style.backgroundSize = 'cover';
      container.style.backgroundPosition = 'center';
      container.style.position = 'relative'; // Necesario para usar posicionamiento absoluto dentro
      // Crear un subcontenedor para el texto
      const textElement = document.createElement('span');
      textElement.innerText = name;
      textElement.style.position = 'absolute';
      textElement.style.bottom = '155px'; // Ajusta la posición desde la parte inferior
      textElement.style.left = '50%'; // Centra horizontalmente
      textElement.style.transform = 'translateX(-50%)'; // Centrado perfecto
      textElement.style.color = 'white'; // Color del texto
      textElement.style.fontWeight = 'bold'; // Negrita
      textElement.style.fontSize = '25px'; // Tamaño del texto
      textElement.style.whiteSpace = 'nowrap'; 
      // Agregar el texto al contenedor
      container.appendChild(textElement);

      document.body.appendChild(container);

      // Generar la imagen
      const canvas = await html2canvas(container, { scale: 2 });
      const link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Eliminar el contenedor temporal
      document.body.removeChild(container);
    };

    generateAndDownload();
  }, [name]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Generando y Descargando Imagen...</h1>
    </div>
  );
};

export default Generate;