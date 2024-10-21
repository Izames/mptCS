import './Auth.css'
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect } from 'react';

export function AuthContent() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Страница авторизации';
  }, []);

  const handleForgotPassword = () => {
    navigate('/Post'); 
  };

  const handleWorkSphere = () => {
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
  )
}