import './Change.css';
import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom'; 
import AppStore from '../store/StatusUser';
import clickSound from '../assets/click-sound.mp3';
import { PageTransition } from './PageTransition';

export function ChangeContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    pin: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: false,
    pin: false,
    password: false
  });
  
  const audioRef = useRef(null);

  useEffect(() => {
    document.title = 'Страница ввода кода и нового пароля';
    audioRef.current = new Audio(clickSound);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prev => ({
        ...prev,
        email: !emailRegex.test(value) && value.length > 0
      }));
    } else if (name === 'pin') {
      setErrors(prev => ({
        ...prev,
        pin: value.length !== 6 && value.length > 0
      }));
    } else if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value.length < 6 && value.length > 0
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound();
    
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const pinValid = formData.pin.length === 6;
    const passwordValid = formData.password.length >= 6;
    
    if (!emailValid || !pinValid || !passwordValid) {
      setErrors({
        email: !emailValid,
        pin: !pinValid,
        password: !passwordValid
      });
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8091/updatePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Email: formData.email, 
          Pin: formData.pin, 
          Password: formData.password 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.jwt);
        setAuth(true);
        navigate('/Checkout');
      } else if (response.status === 400) {
        alert('Неверные данные');
      } else {
        alert('Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <PageTransition>
    <div className="auth-container">
      <h1 className="auth-title">Смена пароля</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-text">Введите адрес электронной почты</h1>
        <input
          type="email"
          name="email"
          className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="error-message">Введите корректный email</span>}
        
        <h1 className="auth-text">Код из сообщения</h1>
        <input
          type="text"
          name="pin"
          className={`auth-input ${errors.pin ? 'auth-input-error' : ''}`}
          value={formData.pin}
          onChange={handleInputChange}
          required
          maxLength={6}
        />
        {errors.pin && <span className="error-message">Код должен содержать 6 символов</span>}
        
        <h1 className="auth-text">Новый пароль</h1>
        <input
          type="password"
          name="password"
          className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength={6}
        />
        {errors.password && <span className="error-message">Пароль должен содержать минимум 6 символов</span>}
        
        <button type="submit" className="auth-button">
          Сменить пароль
        </button>
      </form>
    </div>
    </PageTransition>
  );
}