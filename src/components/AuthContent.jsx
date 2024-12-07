import './Auth.css';
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import AppStore from '../store/StatusUser';

export function AuthContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    document.title = 'Страница авторизации';
  }, []);

 
  const handleForgotPassword = () => {
    navigate('/Post');
  };

  const handleWorkSphere = async () => {
    // Здесь вы должны сделать запрос на сервер для авторизации
    // Пример запроса (замените URL и обработку на ваши)
    try {
      const response = await fetch('https://your-api-url.com/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Предполагаем, что токен приходит в поле `token`

        // Сохранение токена в localStorage
        localStorage.setItem('jwtToken', token);

        // Устанавливаем авторизацию в состоянии приложения
        setAuth(true);
        navigate('/Checkout');
      } else {
        // Обработка ошибок (например, неправильный логин/пароль)
        console.error('Ошибка авторизации');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

 return (
    <div className="auth-container">
      <h1 className="auth-title">Авторизация</h1>
      <div className="auth-form">
        <input
          type="text"
          placeholder="Почта"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email
        />
        <input
          type="password"
          placeholder="Пароль"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Обновляем состояние password
        />
        <button onClick={handleWorkSphere} className="auth-button">Авторизоваться</button>
        <button onClick={handleForgotPassword} className="auth-forgot-password">Забыли пароль?</button>
      </div>
    </div>
  );
}