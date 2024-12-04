import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NameForm = ({ setName }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(input); // Guardar el nombre ingresado
    navigate("/thank-you"); // Navegar a la tarjeta
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ingresa tu nombre</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "20px", padding: "10px 20px" }}>
          Crear Tarjeta
        </button>
      </form>
    </div>
  );
};

export default NameForm;