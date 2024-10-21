import './Auth.css';
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import AppStore from '../store/StatusUser';

export function AuthContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Страница авторизации';
  }, []);

 
  const handleForgotPassword = () => {
    navigate('/Post');
  };

  const handleWorkSphere = () => {
    setAuth(true);
    navigate('/Checkout');
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Авторизация</h1>
      <div className="auth-form">
        <input type="text" placeholder="Почта" className="auth-input" />
        <input type="password" placeholder="Пароль" className="auth-input" />
        <button onClick={handleWorkSphere} className="auth-button">Авторизоваться</button>
        <button onClick={handleForgotPassword} className="auth-forgot-password">Забыли пароль?</button>
      </div>
    </div>
  );
}