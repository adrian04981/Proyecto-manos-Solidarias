import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NameForm.css';
import header from '@/assets/header-logo-white.png';

const NameForm = ({ setName }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(input);
    navigate("/thank-you");
  };

return (
	<div style={{ textAlign: "center", marginTop: "50px", position: "relative", zIndex: 1 }}>
		<img src={header} alt="Header Logo" style={{ width: "150px", marginBottom: "20px" }} />
		<h1>Ingresa tu nombre</h1>
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Tu nombre"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				required
				style={{ padding: "10px", fontSize: "16px", zIndex: 2 }}
			/>
			<br />
			<button type="submit" style={{ marginTop: "20px", padding: "10px 20px" }}>
				Crear Tarjeta
			</button>
		</form>

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
);
};

export default NameForm;