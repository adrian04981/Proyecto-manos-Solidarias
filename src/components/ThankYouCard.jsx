import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";


const ThankYouCard = ({ name }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleDownload = () => {
    if (cardRef.current) {
      htmlToImage.toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "thank-you-card.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      if (cardRef.current) {
        const dataUrl = await htmlToImage.toPng(cardRef.current);
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "thank-you-card.png", { type: "image/png" });

        navigator.share({
          files: [file],
          title: "Gracias",
          text: `Gracias ${name}`,
        });
      }
    } else {
      alert("Tu navegador no soporta compartir.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        ref={cardRef}
        style={{
          width: "300px",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: "10px 0", color: "#333" }}>Gracias</h2>
        <h1 style={{ color: "#007BFF" }}>{name}</h1>
      </div>
      <button onClick={handleDownload} style={{ margin: "10px", padding: "10px 20px" }}>
        Descargar PNG
      </button>
      <button onClick={handleShare} style={{ margin: "10px", padding: "10px 20px" }}>
        Compartir
      </button>
      <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Regresar
      </button>
    </div>
  );
};

export default ThankYouCard;