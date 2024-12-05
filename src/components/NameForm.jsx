import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NameForm.css';
import imga from '@/assets/header-logo-white.png';

const NameForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()) navigate(`/card/${encodeURIComponent(name)}`);
  };

  return (
	<>
    <div style={{ textAlign: "center", padding: "20px" }}>
	<img src={imga} alt="Logo" />
      <h1>🎄 Crea tu tarjeta de Navidad 🎄</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe tu nombre"
        style={{
          padding: "10px",
          fontSize: "16px",
          margin: "10px 0",
          width: "80%",
          maxWidth: "300px",
        }}

      />
	  		<div>      <button
        onClick={handleSubmit}
        style={{
          cursor: "pointer",
        }}
      >
        Continuar
      </button></div>

	  <div style={{ textAlign: "center", marginTop: "50px" }}>
			<div className="initial-snow">
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
				<div className="snow">&#10052;</div>
			</div>
		</div>
    </div>
	</>
  );
};

export default NameForm;