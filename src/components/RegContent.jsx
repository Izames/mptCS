import './Auth.css';
import { useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState, useRef } from 'react';
import AppStore from '../store/StatusUser';
import clickSound from '../assets/click-sound.mp3';
import { PageTransition } from './PageTransition';

export function RegContent() {
  const setAuth = AppStore(state => state.SetAuth); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '' 
  });
  
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    auth: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    document.title = 'Страница регистрации';
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
    } else if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value.length < 6 && value.length > 0,
        confirmPassword: value !== formData.confirmPassword && formData.confirmPassword.length > 0
      }));
    } else if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== formData.password
      }));
    }
  };

  const handleAuthorization = () => {
    playSound();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound();
    
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const passwordValid = formData.password.length >= 6;
    const passwordsMatch = formData.password === formData.confirmPassword;
    
    if (!emailValid || !passwordValid || !passwordsMatch) {
      setErrors({
        email: !emailValid,
        password: !passwordValid,
        confirmPassword: !passwordsMatch,
        auth: false
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8091/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.jwt);
        setAuth(true);
        navigate('/Checkout');
      } else if (response.status === 400) {
        setErrors(prev => ({ ...prev, auth: true }));
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
        <h1 className="auth-title">Регистрация</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-text">Почта</h1>
          <input
            type="email"
            name="email"
            className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <span className="error-message">Введите корректный email</span>}
          
          <h1 className="auth-text">Пароль</h1>
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
          
          <h1 className="auth-text">Подтверждение пароля</h1>
          <input
            type="password"
            name="confirmPassword"
            className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {errors.confirmPassword && <span className="error-message">Пароли не совпадают</span>}
          
          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          
          {errors.auth && (
            <p className="error-message">
              Ошибка регистрации. Возможно, email уже занят.
            </p>
          )}
          
          <div className="auth-divider">или</div>
          
          <button 
            type="button" 
            onClick={handleAuthorization} 
            className="auth-forgot-password"
          >
            Уже есть аккаунт? Войти
          </button>
        </form>
      </div>
    </PageTransition>
  );
}