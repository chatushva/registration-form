// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm.jsx";
import DetailsPage from "./DetailsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/details" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;
