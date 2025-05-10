import './Auth.css';
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState, useRef } from 'react';
import AppStore from '../store/StatusUser';
import clickSound from '../assets/click-sound.mp3';
import { PageTransition } from './PageTransition';

export function AuthContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    auth: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    document.title = 'Страница авторизации';
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
 
  const handleNavigation = (path) => {
    playSound();
    navigate(path);
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
    const passwordValid = formData.password.length >= 6;
    
    if (!emailValid || !passwordValid) {
      setErrors({
        email: !emailValid,
        password: !passwordValid,
        auth: false
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8091/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.jwt);
        setAuth(true);
        navigate('/Checkout');
      } else if (response.status === 400) {
        setErrors(prev => ({ ...prev, auth: true }));
      } else {
        console.error('Ошибка сервера:', response.status);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
    <div className="auth-container">
      <h1 className="auth-title">Авторизация</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-text">Почта</h1>
        <input
          type="email"
          name="email"
          className={`auth-input ${errors.email ? 'border-red-500 border-[2px]' : ''}`}
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="text-red-500 text-sm">Введите корректный email</span>}
        
        <h1 className="auth-text">Пароль</h1>
        <input
          type="password"
          name="password"
          className={`auth-input ${errors.password ? 'border-red-500 border-[2px]' : ''}`}
          value={formData.password}
          onChange={handleInputChange}
          required
          minLength={6}
        />
        {errors.password && <span className="text-red-500 text-sm">Пароль должен содержать минимум 6 символов</span>}
        
        <button type="button" onClick={() => handleNavigation('/Post')} className="auth-forgot-password">
          Забыли пароль?
        </button>
        
        <button type="submit" className="auth-button" disabled={isSubmitting}>
          {isSubmitting ? 'Загрузка...' : 'Авторизоваться'}
        </button>
        
        {errors.auth && <p className="text-red-600 text-xl">Неверный логин или пароль</p>}
        
        <button type="button" onClick={() => handleNavigation('/Reg')} className="auth-forgot-password">
          Регистрация
        </button>
      </form>
    </div>
    </PageTransition>
  );
}