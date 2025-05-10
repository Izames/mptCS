import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthorizationPage } from "./pages/AuthorizationPage.jsx";
import { CheckPage } from "./pages/CheckPage.jsx";
import { ChangePage } from './pages/ChangePage.jsx';
import { PostPage } from './pages/PostPage.jsx';
import { RegPage } from './pages/RegPage.jsx'
import React, { useState } from 'react';
import AppStore from './store/StatusUser.js';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const { Auth } = AppStore();

  return (
    <AnimatePresence mode='wait'>
    <Router>
      <Routes>
        <Route index element={<AuthorizationPage />} />
        <Route path="/Checkout" element={Auth ? <CheckPage /> : <Navigate to="/" />} />
        <Route path="/Change" element={<ChangePage />} />
        <Route path="/Post" element={<PostPage /> } />
        <Route path='/Reg' element={<RegPage /> } />
      </Routes>
    </Router>
    </AnimatePresence>
  );
};

export default App;