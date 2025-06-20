import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Homepage from './pages/HomePage';
import PokedexPage from './pages/PokedexPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pokedex" element={<PokedexPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
