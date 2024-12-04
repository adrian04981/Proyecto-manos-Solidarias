import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NameForm from "./components/NameForm";
import ThankYouCard from "./components/ThankYouCard";

const App = () => {
  const [name, setName] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameForm setName={setName} />} />
        <Route path="/thank-you" element={<ThankYouCard name={name} />} />
      </Routes>
    </Router>
  );
};

export default App;