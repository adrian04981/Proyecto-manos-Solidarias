import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NameForm.css';
import imga from '@/assets/header-logo-white.png';
import mgs from '@/assets/botón regresar.png';

const NameForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) navigate(`/card/${encodeURIComponent(name)}`);
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px", marginTop: "200px" }}>
        <h1 style={{ color: "#fff", fontFamily: "Bookman Old Style Bold" , fontWeight: "bold", textAlign: "center",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"}}>CREA TU TARJETA DE NAVIDAD</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe tu nombre"
          style={{
            padding: "10px",
            fontSize: "20px",
            margin: "10px 0",
            width: "80%",
            maxWidth: "300px",
            opacity: 0.3,
            borderRadius: "10px",
            textAlign: "center",
            color: "#000"
          }}
        />
        <div>
          <button 
            onClick={handleSubmit}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              font: "Sarvatrik Latin VF"
            }}
          >
            CONTINUAR
          </button>
        </div>
      </div>
    </>
  );
};

export default NameForm;