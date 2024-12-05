import React from "react";
import { Routes, Route } from "react-router-dom";
import NameForm from "./components/NameForm";
import ThankYouCard from "./components/ThankYouCard";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NameForm />} />
      <Route path="/card/:name" element={<ThankYouCard />} />
    </Routes>
  );
};

export default App;
