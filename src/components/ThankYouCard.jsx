import React, { useRef } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import backgroundImage from "../assets/Certificado_Manos_Solidarias.png"; // Importa la imagen
import './NameForm.css';
const ThankYouCard = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef();

  const downloadPNG = async () => {
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = "feliz_navidad.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("feliz_navidad.pdf");
  };

  const shareCard = async () => {
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");
    if (navigator.share) {
      const blob = await (await fetch(imgData)).blob();
      const file = new File([blob], "feliz_navidad.png", { type: "image/png" });
      navigator.share({
        files: [file],
        title: "Feliz Navidad",
        text: `Mira mi tarjeta personalizada: Feliz Navidad, ${name}!`,
      });
    } else {
      alert("La función de compartir no está disponible en este navegador.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px", }}>
        Regresar
      </button>
      <div
        ref={cardRef}
        style={{
          width: "300px",
          height: "420px",
          margin: "0 auto",
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          border: "2px solid #ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "115px", color: "#fff"}}>
          {decodeURIComponent(name)}
        </h2>
      </div>
  
      <div style={{ marginTop: "20px" }}>
        <button onClick={downloadPNG} style={{ margin: "10px", padding: "10px 20px" }}>
          Descargar PNG
        </button>
        <button onClick={shareCard} style={{ margin: "10px", padding: "10px 20px" }}>
          Compartir
        </button>
      </div>
    </div>
  );
};

export default ThankYouCard;