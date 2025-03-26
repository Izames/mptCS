import './Auth.css';
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import AppStore from '../store/StatusUser';
import clickSound  from '../assets/click-sound.mp3';

export function AuthContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState(false);
  const [Error, setError] = useState(false);
  
  useEffect(() => {
    document.title = 'Страница авторизации';
  }, []);

  const audio = new Audio(clickSound); 

  const playSound = () => {
    audio.currentTime = 0; 
    audio.play(); 
  };
 
  const handleForgotPassword = () => {
    playSound();
    navigate('/Post');
  };
  const handleReg = () => {
    playSound();
    navigate('/Reg');
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  }
  const handleChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordError(password.length<6)
  }
  const handleWorkSphere = async () => {
    console.log('Отправляемые данные:', { Email, Password });
    try {
      const response = await fetch('http://localhost:8091/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.jwt;
        localStorage.setItem('jwtToken', token);
        setAuth(true);
        navigate('/Checkout');
      } else {
        if (response.status === 400) {
          setError(true);
        } else {
          alert(`Неизвестная ошибка.`);
        }
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

 return (
    <div className="auth-container">
      <h1 className="auth-title">Авторизация</h1>
      <div className="auth-form">
      <h1 className="auth-text">Почта</h1>
        <input
          type="text"
          className={`auth-input ${EmailError ? 'border-red-500 border-[2px]' : ''}`}
          value={Email}
          onChange={handleEmailChange} // Обновляем состояние email
        />
        <h1 className="auth-text">Пароль</h1>
        <input
          type="password"
          className={`auth-input ${PasswordError ? 'border-red-500 border-[2px]' : ''}`}
          value={Password}
          onChange={handleChangePassword} // Обновляем состояние password
        />
        <button onClick={handleForgotPassword} className="auth-forgot-password">Забыли пароль?</button>
        <button onClick={handleWorkSphere} className="auth-button">Авторизоваться</button>
        {Error ? ( // Условное рендеринг сообщения об ошибке
            <p className={'text-red-600 text-xl'}>неверный логин или пароль</p>
        ) : null}
       <button onClick={handleReg} className="auth-forgot-password">Регистрация</button>
      </div>
    </div>
  );
}